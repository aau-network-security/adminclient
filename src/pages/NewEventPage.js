import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Tooltip } from "react-tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import NewEventFormInputs from "../components/events/NewEventFormInputs";
import NewEventFormChallengeSelector from "../components/events/NewEventFormChallengeSelector";
import { NavLink as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/exercises/exerciseSlice";
import { createEvent } from "../features/events/eventSlice";
import NewEventFormProfileSelector from "../components/events/NewEventFormProfileSelector";
import ChallengeProfileSelectorCard from "../components/events/ChallengeProfileSelectorCard";
import SearchBarCard from "../components/challenges/SearchBarCard";
import ClearChallengesDialog from "../components/events/ClearChallengesDialog";
import CreateEventDialog from "../components/events/CreateEventDialog";
import toastMsg from "../components/events/toastMsg";



function DisplayChallengesOrProfiles({
    changeHandler,
    reqDataState,
    setReqDataState
}){
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    if (challengesOrProfile === "profiles"){
        return (
           <NewEventFormProfileSelector
                changeHandler={changeHandler}
                reqData={reqDataState}
                setReqDataState={setReqDataState}/>
        )
    } else if (challengesOrProfile === "category"){
        return (
            <>
             <NewEventFormChallengeSelector
                            changeHandler={changeHandler}
                            reqData={reqDataState}
                            setReqDataState={setReqDataState}
                        />
            
            </>
        )
        // return (<ChallengesCard/>)
    }
}
 


function NewEventPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const status = useSelector((state) => state.event.status);
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    
    
    const [reqDataState, setReqDataState] = useState({
        type: searchParams.get("type"),
        name: "",
        tag: "",
        teamSize: 1,
        maxLabs: 1,
        vmName: "kali-v1-0-3",
        exerciseTags: [],
        expectedFinishDate: "",
        dynamicScoring: false,
        dynamicMax: 1000,
        dynamicMin: 100,
        dynamicSolveThreshold: 100,
        secretKey: "",
    });

    const changeHandler = (e) => {
        if (e.target.name === "eventName") {
            setReqDataState({
                ...reqDataState,
                ["name"]: e.target.value.trim(),
            });
        } else if (e.target.name === "eventTag") {
            setReqDataState({
                ...reqDataState,
                ["tag"]: e.target.value.trim(),
            });
        } else if (e.target.name === "secretKey") {
            setReqDataState({
                ...reqDataState,
                ["secretKey"]: e.target.value.trim(),
            });
        } else if (e.target.name === "dynamicScoring") {
            setReqDataState({
                ...reqDataState,
                ["dynamicScoring"]: e.target.checked,
            });
        } else if (e.target.name === "vmName") {
            setReqDataState({
                ...reqDataState,
                ["vmName"]: e.target.value.trim(),
            });
        }
    };

    // states for clear selected challenges dialog. 
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const onAlertClose = () => setIsAlertOpen(false)
    const cancelRef = React.useRef()

    const openAlertDialog = (e) => {
        setIsAlertOpen(true)
        }
    

    const doClearSelectedChallenges = (e) => {
        console.log("clear selected challenges")
        setReqDataState({
            ...reqDataState,
            ["exerciseTags"]:
                [],
        })

    }
    const noChallengesSelected = () => {
        toastIdRef.current = toast({
            title: "No challenges selected",
            description: "Select some challenges to create an event",
            status: "error",
            duration: 5000,
            isClosable: true,});
    }

    const [createEventIsAlertOpen, setCreateEventIsAlertOpen] = useState(false)
    const createEventOnAlertClose = () => setCreateEventIsAlertOpen(false)
    // const cancelRef = React.useRef()

    const openCreateEventDialog = (e) => {
        const formCheck = toastMsg(reqDataState)
        console.log("formCheck",formCheck)
        if (formCheck.msg =! ""){
            toastIdRef.current = toast(formCheck.toastData);
            setCreateEventIsAlertOpen(false)
        }else{
            setCreateEventIsAlertOpen(true)
        }
        
        }

    const toast = useToast();
    const toastIdRef = React.useRef();
    const handleSubmit = async (e) => {
        setCreateEventIsAlertOpen(false)
        e.preventDefault();
        var reqData = {
            type: reqDataState.type === "advanced" ? 1 : 0,
            name: reqDataState.name,
            tag: reqDataState.tag,
            teamSize: reqDataState.teamSize,
            maxLabs: reqDataState.maxLabs,
            vmName: "kali-v1-0-3",
            exerciseTags: reqDataState.exerciseTags,
            expectedFinishDate: reqDataState.expectedFinishDate.toISOString(),
            dynamicScoring: reqDataState.dynamicScoring,
            dynamicMax: reqDataState.dynamicMax,
            dynamicMin: reqDataState.dynamicMin,
            dynamicSolveThreshold: reqDataState.dynamicSolveThreshold,
            secretKey: reqDataState.secretKey,
        };
        const formCheck = toastMsg(reqDataState)
        console.log("formCheck",formCheck)
        if (formCheck.msg =! ""){
            toastIdRef.current = toast(formCheck.toastData);
            return;
        }

        try {
            const response = await dispatch(createEvent(reqData)).unwrap();
            toastIdRef.current = toast({
                title: "Event successfully created",
                description: "The event was successfully created",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/events")
        } catch (err) {
            console.log("got error starting exercise", err);
            toastIdRef.current = toast({
                title: "Error creating event",
                description: err.apiError.status,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <>
        <Flex
            flexDirection="column"
            width="90%"
            height="fit-content"
            maxH="1000px"
            backgroundColor="white"
            margin="auto"
            padding="30px"
        >
            <Box height="100%">
                {status === "creatingEvent" ? (
                    <Flex
                        height={
                            searchParams.get("type") === "advanced"
                                ? "960px"
                                : "755px"
                        }
                        alignItems="center"
                        justifyContent="center"
                        flexDir="column"
                    >
                        <Text color="aau.primary" fontSize="30px" marginBottom={10}>
                            Creating event
                        </Text>
                        <Logo size="200px" className="icon-spin" />
                    </Flex>
                ) : (
                    <>
                        
                        <Flex flexDir="row">
                            <Flex w="40%">
                                <Text color="aau.primary" fontSize="30px" marginBottom={10}>
                                    Create new {searchParams.get("type")} event
                                </Text>
                            </Flex>    
                            <Flex w="19%" marginLeft="10px" marginTop="20px">
                                <ChallengeProfileSelectorCard/>
                            </Flex>
                            {challengesOrProfile === "category" ?( 
                            <Flex w="40%" margin="20px 0 0 0px" padding="0px 0px 25px 20px">
                                <SearchBarCard/>
                            </Flex>
                            ):(
                                <></>
                            )

                            
                            }
                            

                        </Flex>
                        
                           
                        <form
                            onSubmit={handleSubmit}
                            style={{ height: "100%" }}
                        >
                            <Flex
                                flexDir="row"
                                height={
                                    searchParams.get("type") === "advanced"
                                        ? "755px"
                                        : "550px"
                                }
                            >
                                <NewEventFormInputs
                                    changeHandler={changeHandler}
                                    reqData={reqDataState}
                                    setReqDataState={setReqDataState}
                                />

                                <DisplayChallengesOrProfiles
                                    changeHandler={changeHandler}
                                    reqDataState={reqDataState}
                                    setReqDataState={setReqDataState}
                                />
                                {/* <NewEventFormChallengeSelector
                                    changeHandler={changeHandler}
                                    reqData={reqDataState}
                                    setReqDataState={setReqDataState}
                                /> */}
                            </Flex>
                            <Flex
                                width={"100%"}
                                marginTop="20px"
                                justifyContent={"right"}
                            >
                                <Button
                                    colorScheme="aau.button"
                                    color="white"
                                    as={ReactLink}
                                    to="/events"
                                    marginRight="30px"
                                >
                                    Back
                                </Button>
                                
                                {reqDataState.exerciseTags.length === 0
                                
                                ?(<>
                                    <Button
                                    colorScheme="aau.buttonGray"
                                    color="white"
                                    // type="submit"
                                    onClick={()=> noChallengesSelected()}
                                    marginRight="210px"
                                >
                                    Create event
                                </Button>
                               
                               
                                <Button
                                    colorScheme="aau.buttonGray"
                                    color="white"
                                    onClick={() => noChallengesSelected()}
                                >
                                    Clear selected challenges
                                </Button>
                                
                                </>):(
                                <>
                                    <Button
                                    colorScheme="aau.buttonGreen"
                                    color="white"
                                    // type="submit"
                                    onClick={()=> openCreateEventDialog()}
                                    marginRight="210px"
                                    // type="submit"
                                >
                                    Create event
                                </Button>
                               
                               
                                <Button
                                    colorScheme="aau.button"
                                    color="white"
                                    
                                    onClick={() => openAlertDialog()}
                                >
                                    Clear selected challenges
                                </Button>
                                </>
                                )
                                
                                }
                                
                            </Flex>
                            <CreateEventDialog
                                isOpen={createEventIsAlertOpen}
                                onClose={createEventOnAlertClose}
                                cancelRef={cancelRef}
                                createEvent={handleSubmit}
                                reqData={reqDataState}
                                setReqDataState={setReqDataState}
                                />
                        </form>
                        
                    </>
                )}
            </Box>
            <Tooltip style={{ zIndex: 999 }} id="tooltip-exercise-difficulity" />
            <Tooltip id="tooltip-private-profile" />
            <Tooltip id="tooltip-event-tag" />
            <Tooltip id="tooltip-secret-key" />
            <Tooltip id="tooltip-max-labs" />
            <Tooltip id="tooltip-finish-date" />
            <Tooltip id="tooltip-dynamic-scoring" />
            <Tooltip id="tooltip-dynamic-scoring-max" />
            <Tooltip id="tooltip-dynamic-scoring-min" />
            <Tooltip id="tooltip-dynamic-scoring-solve-threshold" />
            <Tooltip id="tooltip-team-size" />
        </Flex>
        
        <ClearChallengesDialog 
            isOpen={isAlertOpen}
            onClose={onAlertClose}
            cancelRef={cancelRef}
            deleteProfile={doClearSelectedChallenges}> </ClearChallengesDialog>
        </>
    );
}

export default NewEventPage;
