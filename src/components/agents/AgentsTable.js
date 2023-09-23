import {
    Center,
    Flex,
    Icon,
    IconButton,
    Spacer,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import LoadingSpin from "react-loading-spin";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAgent,
    fetchAgents,
    reconnectAgent,
    selectAgent,
} from "../../features/agents/agentSlice";
import AgentDialogDelete from "./AgentDialogDelete";
import { Tooltip } from "react-tooltip";
import NewAgentModal from "./NewAgentModal";
import { MdDelete } from "react-icons/md";
import { defaultTheme } from "../..";

function AgentsTable() {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const onAlertClose = () => setIsAlertOpen(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onModalClose = () => setIsModalOpen(false);

    const [agentNameState, setAgentNameState] = useState("");
    const [indexState, setIndexState] = useState(0);

    const cancelRef = React.useRef();

    const status = useSelector((state) => state.agent.status);
    const error = useSelector((state) => state.agent.error);
    const statusCode = useSelector((state) => state.agent.statusCode);
    const agents = useSelector((state) => state.agent.agents)
    const selectedAgent = useSelector((state) => state.agent.selectedAgent);
    const dispatch = useDispatch();
    //Callback for alertDialog
    // TODO write deleteOrg action, reducer, etc.
    // TODO Add weight to table
    const doDeleteAgent = (agentName, index) => {
        let agent = {
            id: index,
            name: agentName,
        };
        dispatch(deleteAgent(agent));
    };

    const setSelectedAgent = (agent) => {
        dispatch(selectAgent(agent));
    };

    const reconnectToAgent = async (id, agentName) => {
        try {
            let agent = {
                id: id,
                name: agentName,
            };
            let resp = await dispatch(reconnectAgent(agent));
        } catch (err) {
            console.log("err", err);
        }
    };

    useEffect(() => {
        dispatch(fetchAgents());
    }, [dispatch]);

    const openAlertDialog = (agentName, index) => {
        setAgentNameState(agentName);
        setIndexState(index);
        setIsAlertOpen(true);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <Flex direction="column" h="100%" w="100%">
            <Flex className="container-header">
                <h2 className="container-header-text">Agents</h2>
                <Spacer />
                <IconButton
                    className="container-header-button"
                    colorScheme="aau.buttonGreen"
                    variant="ghost"
                    icon={<Icon as={IoMdAdd} />}
                    data-tooltip-content="Add Agent"
                    data-tooltip-place="left"
                    data-tooltip-effect="solid"
                    data-tooltip-id="tooltip-add-agent"
                    onClick={openModal}
                />
                <Tooltip
                    id={"tooltip-add-agent"}
                    style={{
                        backgroundColor: defaultTheme.colors.aau.primary,
                    }}
                />
            </Flex>
            {status === "fetching" ? (
                <Center height="100%" width="100%" position="relative">
                    <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
                </Center>
            ) : Object.keys(agents).length === 0 ? (
                <Center>
                    <h2>No agents registered</h2>
                </Center>
            ) : (
                <>
                    <TableContainer
                        overflowY="unset"
                        height="100%"
                        width="100%"
                    >
                        <Table variant="simple" size="sm">
                            <Thead
                                position="sticky"
                                top={0}
                                zIndex="100"
                                backgroundColor="white"
                            >
                                <Tr>
                                    <Th textAlign="center">Reconnect</Th>
                                    <Th >Name</Th>
                                    <Th textAlign="center">Connected</Th>
                                    <Th isNumeric>Weight</Th>
                                    <Th >Url</Th>
                                    <Th textAlign="center">TLS</Th>
                                    <Th textAlign="center">State locked</Th>
                                    <Th textAlign="center">Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.entries(agents).map(([key, agent]) => (
                                    <Tr
                                        key={agent.name}
                                        _hover={{
                                            backgroundColor: "aau.hover",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setSelectedAgent(agent)}
                                        backgroundColor={
                                            !selectedAgent
                                                ? ""
                                                : selectedAgent.name ===
                                                  agent.name
                                                ? "aau.hover"
                                                : ""
                                        }
                                    >
                                        <Td
                                            alignContent={"center"}
                                            position="relative"
                                            zIndex="10"
                                        >
                                            <Center>
                                                {/* TODO return a loading statement from daemon */}
                                                {agent.loading ? (
                                                    <IconButton
                                                        aria-label="Reconnect to agent"
                                                        variant="ghost"
                                                        icon={
                                                            <Center height="100%" width="100%" position="relative">
                                                                <Spinner color="aau.primary" size="" height="50%" width="50%" thickness="2px"/>
                                                            </Center>
                                                        }
                                                    />
                                                ) : (
                                                    <IconButton
                                                        aria-label="Reconnect to agent"
                                                        variant="ghost"
                                                        colorScheme="aau.button"
                                                        icon={<IoMdRefresh />}
                                                        onClick={() =>
                                                            reconnectToAgent(
                                                                key,
                                                                agent.name
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Center>
                                        </Td>
                                        <Td>{agent.name}</Td>
                                        <Td textAlign="center">
                                            <Icon
                                                as={
                                                    agent.connected
                                                        ? TiTick
                                                        : RxCross2
                                                }
                                                fontSize="xl"
                                                color={
                                                    agent.connected
                                                        ? "aau.green"
                                                        : "aau.red"
                                                }
                                            />
                                        </Td>
                                        <Td isNumeric>
                                            {agent.weight}
                                        </Td>

                                        <Td>{agent.url}</Td>
                                        <Td textAlign="center">
                                            <Icon
                                                as={
                                                    agent.tls
                                                        ? TiTick
                                                        : RxCross2
                                                }
                                                fontSize="xl"
                                                color={
                                                    agent.tls
                                                        ? "aau.green"
                                                        : "aau.red"
                                                }
                                            />
                                        </Td>
                                        <Td textAlign="center">
                                            <Icon
                                                as={
                                                    agent.stateLock
                                                        ? TiTick
                                                        : RxCross2
                                                }
                                                fontSize="xl"
                                                color={
                                                    agent.stateLock
                                                        ? "aau.green"
                                                        : "aau.red"
                                                }
                                            />
                                        </Td>
                                        <Td textAlign="center">
                                            <IconButton
                                                aria-label="Delete organization"
                                                colorScheme="aau.buttonRed"
                                                variant="ghost"
                                                fontSize="20px"
                                                icon={<MdDelete />}
                                                onClick={() =>
                                                    openAlertDialog(
                                                        agent.name,
                                                        key
                                                    )
                                                }
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <AgentDialogDelete
                        agentName={agentNameState}
                        index={indexState}
                        isOpen={isAlertOpen}
                        onClose={onAlertClose}
                        cancelRef={cancelRef}
                        deleteAgent={doDeleteAgent}
                    ></AgentDialogDelete>
                </>
            )}
            <NewAgentModal isOpen={isModalOpen} onClose={onModalClose} />
        </Flex>
    );
}

export default AgentsTable;
