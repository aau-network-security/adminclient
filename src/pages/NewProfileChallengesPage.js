import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    Spacer,
    Text,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Tooltip } from "react-tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import NewProfileFormInputs from "../components/challenges/NewProfileFormInputs";
import NewProfileFormChallengeSelector from "../components/challenges/NewProfileFormChallengeSelector";
import { NavLink as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/exercises/exerciseSlice";
import { createEvent } from "../features/events/eventSlice";
import SearchBarCard from '../components/challenges/SearchBarCard';
import { MdClose } from 'react-icons/md'
import { createProfile, fetchProfiles, selectProfile } from "../features/profiles/profileSlice";
import SelectedChallengesCard from "../components/challenges/SelectedChallengesCard";


function NewProfileChallengesPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const status = useSelector((state) => state.profile.status);
    
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    

    const [reqDataState, setReqDataState] = useState({
        name: "",
        description:"",
        public:false,
        exerciseTags: [],
    });
    
    const changeHandler = (e) => {
        if (e.target.name === "profileName") {
            // console.log("name", e.target.value.trim())
            setReqDataState({
                ...reqDataState,
                ["name"]: e.target.value.trim(),
            });
        } else if (e.target.name === "profileDescription") {
            // console.log("description", e.target.value.trim())
            setReqDataState({
                ...reqDataState,
                ["description"]: e.target.value.trim(),
            });
        } else if (e.target.name === "publish"){
            // console.log("public", e.target.checked)
            setReqDataState({
                ...reqDataState,
                ["public"]: e.target.checked
            })
        }
    
        
    };

    const toast = useToast();
    const toastIdRef = React.useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        var reqData = {
            name: reqDataState.name,
            description: reqDataState.description,
            exerciseTags: reqDataState.exerciseTags,
            public:reqDataState.public
        };
        
        // Convert type to number that daemon understands
        // TODO: Fix slice and don't use createEvent but another function from "profile slice"

        if (reqData.exerciseTags.length === 0) {
            toastIdRef.current = toast({
                title: "No challenges selected",
                description: "Select some challenges to create a profile",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await dispatch(createProfile(reqData)).unwrap();
            toastIdRef.current = toast({
                title: "profile successfully created",
                description: "The profile was successfully created",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            
            // dispatch(fetchProfiles());
            // var newProfile = profiles.filter(item => item.name === reqDataState.name);
            // console.log("updated profile", newProfile[0])
            // dispatch(selectProfile(newProfile[0]));
            navigate("/challenges")

        } catch (err) {
            // console.log("got error saving profile", err);
            toastIdRef.current = toast({
                title: "Saving profile",
                description: err.apiError.status,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };
    return (
        <Flex
            flexDirection="column"
            width="90%"
            height="fit-content"
            maxH="1000px"
            backgroundColor="white"
            margin="auto"
            padding="30px"
            overflowY="auto"
        >
            <Flex>
            <Text color="aau.primary" fontSize="30px" >
                            Create New Profile
            </Text>
            <Spacer/>
            <Button
                // colorScheme="aau.button"
                color="white"
                bg="white"
                as={ReactLink}
                to="/challenges"
                // marginRight="30px"
            >
               <Icon as={MdClose} fontSize="30px" color="#211a52"/>
            </Button>
            </Flex>
            
            <Box height="100%">
                {status === "Saving Profile" ? (
                    <Flex
                        height="755px"
                        alignItems="center"
                        justifyContent="center"
                        flexDir="column"
                    >
                        <Text color="aau.primary" fontSize="30px" marginBottom={10}>
                            Saving Profile
                        </Text>
                        <Logo size="200px" className="icon-spin" />
                    </Flex>
                ) : (
                    <>
                        <HStack>
                        
                        <Flex flexDir="column" h="100%" w="40%">
                            <Text color="aau.primary" fontSize="30px" marginBottom={10}>
                                
                            </Text>
                        </Flex>
                        <Flex flexDir="column" h="100%" w="60%" >
                            <SearchBarCard />
                        </Flex>
                        </HStack>
                        
                        <form
                            onSubmit={handleSubmit}
                            style={{ height: "100%" }}
                        >
                            <Flex
                                flexDir="row"
                                height={"550px"}
                                marginTop="20px"
                            >   
                               
                            
                                <NewProfileFormInputs
                                    changeHandler={changeHandler}
                                    reqData={reqDataState}
                                    setReqDataState={setReqDataState}
                                />
                               
                               
                                <NewProfileFormChallengeSelector
                                    changeHandler={changeHandler}
                                    reqData={reqDataState}
                                    setReqDataState={setReqDataState}
                                />
                            </Flex>
                            <Flex
                                width={"100%"}
                                marginTop="20px"
                                justifyContent={"center"}
                            >
                                <Button
                                    colorScheme="aau.button"
                                    color="white"
                                    as={ReactLink}
                                    to="/challenges"
                                    marginRight="30px"
                                >
                                    Back
                                </Button>
                                <Button
                                    colorScheme="aau.buttonGreen"
                                    color="white"
                                    type="submit"
                                >
                                    Save Profile
                                </Button>
                            </Flex>
                        </form>
                    </>
                )}
            </Box>
            <Tooltip id="tooltip-profile-public" />
            <Tooltip id="tooltip-profile-description" />
        </Flex>
    );
}

export default NewProfileChallengesPage;
