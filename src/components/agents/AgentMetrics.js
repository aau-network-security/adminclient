import {
    Center,
    Flex,
    Grid,
    GridItem,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/client";
import { IoMdRefresh } from "react-icons/io";
import { defaultTheme } from "../..";

function AgentMetrics(websocket) {
    var httpProtocol = "http://";
    var wsProtocol = "ws://";
    if (window.location.protocol === "https:") {
        httpProtocol = "https://";
        wsProtocol = "wss://";
    }
    var baseWsUrl = BASE_URL.replace(httpProtocol, wsProtocol) + "agents/ws/";
    const selectedAgent = useSelector((state) => state.agent.selectedAgent);
    const [previousSelected, setPreviousSelected] = useState("");
    const [webSocket, setWebSocket] = useState(null);
    const [cpuState, setCpuState] = useState(0);
    const [memoryState, setMemoryState] = useState(0);
    const [labCount, setLabCount] = useState(0);
    const [vmCount, setVmCount] = useState(0);
    const [containerCount, setContainerCount] = useState(0);
    if (selectedAgent !== null) {
        if (selectedAgent.name !== previousSelected) {
            try {
                if (webSocket != null) {
                    console.log("closing previous websocket");
                    webSocket.close();
                }
                setCpuState(0);
                setMemoryState(0);
                setLabCount(0);
                setContainerCount(0);
                setVmCount(0);
                setWebSocket(new WebSocket(baseWsUrl + selectedAgent.name));
                setPreviousSelected(selectedAgent.name);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const reconnectToMetrics = () => {
        try {
            if (webSocket != null) {
                webSocket.close();
            }
            setCpuState(0);
            setMemoryState(0);
            setLabCount(0);
            setContainerCount(0);
            setVmCount(0);
            setWebSocket(new WebSocket(baseWsUrl + selectedAgent.name));
            setPreviousSelected(selectedAgent.name);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (webSocket !== null) {
            webSocket.onopen = (event) => {
                let tokenObject = {
                    token: localStorage.getItem("token"),
                };
                webSocket.send(JSON.stringify(tokenObject));
            };

            webSocket.onmessage = function (event) {
                try {
                    let data = JSON.parse(event.data);
                    setCpuState(data.Cpu.toFixed(2));
                    setMemoryState(data.Memory.toFixed(2));
                    setLabCount(data.LabCount);
                    setVmCount(data.VmCount);
                    setContainerCount(data.ContainerCount);
                } catch (e) {
                    console.log(
                        "could not pass websocket message as JSON. Got message: ",
                        event.data
                    );
                }
            };

            webSocket.onclose = function (event) {
                console.log("closing websocket");
            };

            webSocket.onerror = function (err) {
                console.log(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );
                webSocket.close();
            };

            return () => {
                webSocket.close();
            };
        }
    }, [webSocket]);
    const cpuSeries = [cpuState];
    const cpuOptions = {
        chart: {
            type: "radialBar",
        },

        colors: [defaultTheme.colors.aau.primary],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: "60%",
                    background: "#fff",
                },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15,
                    },
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        color: defaultTheme.colors.aau.primary,
                        fontSize: "15px",
                    },
                    value: {
                        color: defaultTheme.colors.aau.primary,
                        fontSize: "20px",
                        show: true,
                    },
                },
            },
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["CPU"],
    };

    const memSeries = [memoryState];
    const memOptions = {
        chart: {
            type: "radialBar",
        },

        colors: [defaultTheme.colors.aau.primary],
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: "60%",
                    background: "#fff",
                },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15,
                    },
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        color: defaultTheme.colors.aau.primary,
                        fontSize: "15px",
                    },
                    value: {
                        color: defaultTheme.colors.aau.primary,
                        fontSize: "20px",
                        show: true,
                    },
                },
            },
        },
        stroke: {
            lineCap: "round",
        },
        labels: ["Memory"],
    };

    return (
        <Flex w="100%" h="100%" flexDir="column">
            <Flex className="container-header" w="100%">
                <h2 className="container-header-text">Metrics</h2>
                <Spacer />
                {selectedAgent !== null ? (
                    <IconButton
                        aria-label="Reconnect to agent"
                        variant="ghost"
                        colorScheme="aau.button"
                        icon={<IoMdRefresh />}
                        onClick={reconnectToMetrics}
                    />
                ) : null}
            </Flex>
            {selectedAgent !== null ? (
                <Flex height="100%">
                    <Center w="100%" h="100%">
                        <Grid
                            h="100%"
                            w="75%"
                            templateRows="repeat(1, 1fr)"
                            templateColumns="repeat(12, 1fr)"
                            gap={5}
                        >
                            <GridItem colSpan={4}>
                                <Chart
                                    height="100%"
                                    type="radialBar"
                                    options={cpuOptions}
                                    series={cpuSeries}
                                />
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Chart
                                    height="100%"
                                    type="radialBar"
                                    options={memOptions}
                                    series={memSeries}
                                />
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Center h="100%">
                                    <Grid
                                        height="60%"
                                        width="100%"
                                        templateRows="repeat(3, 1fr)"
                                        templateColumns="repeat(1, 1fr)"
                                        gap={0}
                                    >
                                        <GridItem rowSpan={1} display="flex">
                                            <Text className="metric-title">
                                                Active labs
                                            </Text>
                                            <Text className="metric-value">
                                                {labCount}
                                            </Text>
                                        </GridItem>
                                        <GridItem rowSpan={1} display="flex">
                                            <Text className="metric-title">
                                                Containers
                                            </Text>
                                            <Text className="metric-value">
                                                {containerCount}
                                            </Text>
                                        </GridItem>
                                        <GridItem rowSpan={1} display="flex">
                                            <Text className="metric-title">
                                                Virtual Machines
                                            </Text>
                                            <Text className="metric-value">
                                                {vmCount}
                                            </Text>
                                        </GridItem>
                                    </Grid>
                                </Center>
                            </GridItem>
                        </Grid>
                    </Center>
                </Flex>
            ) : (
                <Center>
                    <h2 className="container-header-text">
                        Select an agent from the list above
                    </h2>
                </Center>
            )}
        </Flex>
    );
}

export default AgentMetrics;
