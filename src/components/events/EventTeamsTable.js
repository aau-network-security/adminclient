import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Center,
    Flex,
    HStack,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { fetchEventTeams, forceTeamSolve, setSolvedStatus } from "../../features/teams/teamSlice";
import { MdDelete, MdRefresh } from "react-icons/md";
import moment from "moment";
import { SearchIcon } from "@chakra-ui/icons";
import { cloneDeep, debounce } from "lodash";

function EventTeamsTable() {
    const teamsState = useSelector((state) => state.team.teams);
    const status = useSelector((state) => state.team.status);
    const [teams, setTeams] = useState(teamsState)
    const selectedEvent = useSelector((state) => state.event.selectedEvent);
    const dispatch = useDispatch();
    useEffect(() => {
        if (selectedEvent) {
            var req = {
                eventTag: selectedEvent.tag,
            };
            dispatch(fetchEventTeams(req));
        }
    }, [selectedEvent]);

    /* Team modal */
    const [clickedTeam, setClickedTeam] = useState(0);
    const {
        isOpen: isTeamModalOpen,
        onClose: onTeamModalClose,
        onOpen: onTeamModalOpen,
    } = useDisclosure();

    const openTeamModal = (key) => {
        setClickedTeam(key);
        onTeamModalOpen();
    };

    const toast = useToast()
    const toastIdRef = React.useRef()
    const forceSolve = async (exerciseTag) => {
        let request = {
            eventTag: selectedEvent.tag,
            exerciseTag: exerciseTag,
            teamName: teams[clickedTeam].username,
          }
          try {
            const response = await dispatch(forceTeamSolve(request)).unwrap()
            toastIdRef.current = toast({
              title: 'Challenge successfully solved',
              description: "The attempt to force solve a challenge was successful",
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
            console.log(teams[clickedTeam])
            let exercises = teams[clickedTeam].labInfo.exercises
            console.log(exercises)
            exercises.forEach((exercise, parentIdx) => {
                console.log("parent: ", parentIdx, exercise)
                let childExercises = exercise.childExercises
                console.log(childExercises)
                childExercises.forEach((childExercise, childIdx) => {
                    if (childExercise.tag === exerciseTag) {
                        dispatch(setSolvedStatus({
                            team: clickedTeam,
                            parentIdx: parentIdx,
                            childIdx: childIdx,
                            solveStatus: true
                        }))
                        return
                    }
                })
            })
          } catch (err) {
            console.log(err)
            toastIdRef.current = toast({
              title: 'Error solving challenge',
              description: err.apiError.status,
              status: 'error',
              duration: 5000,
              isClosable: true,
            })
          }
    }
    const challengesSolving = useSelector((state) => state.team.challengesSolving)
    const TeamModal = () => {
        let username = "";
        if (!teams[clickedTeam]) {
            return (
                <></>
            )
        }
        if (teams.length) {
            username = teams[clickedTeam].username;
        }
        
        return (
            <Modal
                onClose={onTeamModalClose}
                isOpen={isTeamModalOpen}
                isCentered        
            >
                <ModalOverlay />
                <ModalContent height="600px" width="1300px" maxWidth={"1300px"} display="flex">
                    <ModalHeader>{username}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody height="450px" display="flex">
                        {teamsState[clickedTeam].labInfo ? (
                            <>
                                {teamsState[clickedTeam].labInfo.tag === "" ? (
                                    <Center height="100%" width="100%">
                                        Team currently has no lab
                                    </Center>
                                ) : (
                                    <HStack spacing={10} height="100%" width="100%">
                                        <Flex 
                                            height="100%" 
                                            width="100%" 
                                            bg="aau.bg" 
                                            borderRadius="5px"
                                            padding="0px 10px 0 10px"
                                            flexDir="column"
                                        >
                                            <Text className="container-header-text">
                                                Lab Containers
                                            </Text>
                                            
                                            <Accordion allowMultiple overflowY="auto" height={"100%"}>
                                                {Object.entries(teams[clickedTeam].labInfo.exercises).map(([key, exercise]) => (
                                                    <React.Fragment key={key}>
                                                        {exercise.machines.length > 0 ? (
                                                            <AccordionItem key={key}>
                                                                <h2>
                                                                    <AccordionButton>
                                                                        <Box as="span" flex='1' textAlign='left'>
                                                                        <b>{exercise.tag}</b>
                                                                        </Box>
                                                                        <AccordionIcon />
                                                                    </AccordionButton>
                                                                </h2>
                                                                <AccordionPanel pb={4}>
                                                                    <TableContainer>
                                                                        <Table size="sm">
                                                                            <Thead position="sticky" zIndex="100">
                                                                                <Tr>
                                                                                    <Th className='custom-table-header'>Id</Th>
                                                                                    <Th className='custom-table-header'>Type</Th>
                                                                                    <Th className='custom-table-header'>Registry url</Th>
                                                                                    <Th className='custom-table-header'>Status</Th>
                                                                                </Tr>
                                                                            </Thead>
                                                                            <Tbody>
                                                                                {Object.entries(exercise.machines).map(([key, machine]) => (
                                                                                    <Tr key={key}>
                                                                                        <Td>{machine.id}</Td>
                                                                                        <Td>{machine.type}</Td>
                                                                                        <Td style={{textWrap: "wrap"}}>{machine.image}</Td>
                                                                                        <Td
                                                                                            color={machine.status === "running" ? "aau.green" : "aau.red"}
                                                                                        >
                                                                                            {machine.status}
                                                                                        </Td>
                                                                                    </Tr>
                                                                                ))}
                                                                            </Tbody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </AccordionPanel>
                                                            </AccordionItem>
                                                        ):(
                                                            <AccordionItem key={key}>
                                                                <h2>
                                                                    <AccordionButton>
                                                                        <Box as="span" flex='1' textAlign='left'>
                                                                        <b>{exercise.tag}</b>
                                                                        </Box>
                                                                        <AccordionIcon />
                                                                    </AccordionButton>
                                                                </h2>
                                                                <AccordionPanel pb={4}>
                                                                    Exercise has not yet been started                                                    
                                                                </AccordionPanel>
                                                            </AccordionItem>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </Accordion>
                                        </Flex>
                                        <Flex 
                                            height="100%" 
                                            width="100%"
                                            bg="aau.bg" 
                                            borderRadius="5px"
                                            
                                            flexDir="column"
                                        >
                                            <Text className="container-header-text" padding="0px 10px 0 10px"> 
                                                Challenge flags
                                            </Text>
                                            <VStack align='stretch' height="100%" overflowY="auto" padding="0px 10px 0 10px">
                                                {Object.entries(teams[clickedTeam].labInfo.exercises).map(([key, exercise]) => (
                                                    <React.Fragment key={key}>
                                                        {Object.entries(exercise.childExercises).map(([key, childExercise]) => (
                                                            <Flex key={key}>
                                                                <Flex flexDir="column">
                                                                    <Heading fontSize="15px">
                                                                        {childExercise.name}
                                                                    </Heading>
                                                                    <Text>{childExercise.flag}</Text>
                                                                </Flex>
                                                                <Spacer/>
                                                                <Button 
                                                                    colorScheme="aau.button" 
                                                                    isDisabled={childExercise.solved}
                                                                    onClick={() => forceSolve(childExercise.tag)}
                                                                    isLoading={typeof challengesSolving[childExercise.tag] !== "undefined" ? true : false}
                                                                >
                                                                    {childExercise.solved ? (
                                                                        <>
                                                                            Solved
                                                                        </>
                                                                    ):(
                                                                        <>
                                                                            Solve
                                                                        </>
                                                                    )}
                                                                </Button>
                                                            </Flex>              
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </VStack>
                                        </Flex>
                                    </HStack>
                                )}
                            </>
                        ):(
                            <Center height="100%" width="100%">
                                Team currently has no lab
                            </Center>
                        )}
                    
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onTeamModalClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };

    const [searchValue, setSearchValue] = useState("");
    
    const changeSearchData = (text, teams) => {
        if (text === "") {
          setTeams(cloneDeep(teams));
        } else {
            setTeams(
                cloneDeep(
                teams.filter((el) => {
                    return el.username.toLowerCase().indexOf(text.toLowerCase()) > -1;
                })
                )
            )
        }
      };
      const debounceLoadData = useCallback(debounce(changeSearchData, 500), []);

      useEffect(() => {
        debounceLoadData(searchValue, teamsState);
      }, [searchValue, teamsState]);

      useEffect(() => {
        setTeams(teamsState)
      }, [teamsState])
    return (
        <>
            <Flex className="container-header" height="60px">
                <h2
                    style={{ margin: "auto", marginLeft: "0" }}
                    className="container-header-text"
                >
                    Teams
                </h2>
                <Spacer />
                {selectedEvent && (
                <InputGroup width="300px" margin="auto">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="aau.primary" />
                    </InputLeftElement>
                    <Input type="tel" placeholder="Search teams" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                </InputGroup>
                )}
            </Flex>
            {selectedEvent && (
                <>
                {status === "fetching" ? (
                    <Center height="100%" width="100%" position="relative">
                        <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
                    </Center>
                ) : (
                    <>
                        <TableContainer overflowY="unset" h="88%">
                        <Table variant="simple" size="sm">
                            <Thead
                                position="sticky"
                                top={0}
                                zIndex="100"
                                backgroundColor="white"
                            >
                                <Tr>
                                    {
                                        selectedEvent && selectedEvent.status === "running" && (
                                            <Th textAlign="center">
                                                Reset lab core/Delete user
                                            </Th>
                                        )
                                    }
                                    <Th>Teamname</Th>
                                    <Th>Email</Th>
                                    <Th>Status</Th>
                                    <Th>Created at</Th>
                                    <Th>Last Accessed</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {Object.entries(teams).map(([key, team]) => (
                                    <Tr key={key}>
                                        {
                                        selectedEvent && selectedEvent.status === "running" && (
                                        <Td width="200px" textAlign="center">
                                            <IconButton
                                                color="aau.primary"
                                                colorScheme="aau.button"
                                                variant="ghost"
                                                fontSize="20px"
                                                icon={<MdRefresh />}
                                                marginRight={"10px"}
                                                data-tooltip-html="Reset lab core <br> Resets the core lab components (DNS and DHCP)"
                                                data-tooltip-place="right"
                                                data-tooltip-effect="solid"
                                                data-tooltip-id="tooltip-reset-lab"
                                            />
                                            <IconButton
                                                colorScheme="aau.buttonRed"
                                                variant="ghost"
                                                fontSize="20px"
                                                icon={<MdDelete />}
                                                data-tooltip-content="Delete user"
                                                data-tooltip-place="right"
                                                data-tooltip-effect="solid"
                                                data-tooltip-id="tooltip-delete-user"
                                            />
                                        </Td>
                                        )}
                                        <Td>
                                            {
                                            selectedEvent && selectedEvent.status === "running" ? (
                                                <Link
                                                    textDecoration="underline"
                                                    _hover={{ color: "aau.primary" }}
                                                    fontWeight={600}
                                                    onClick={() => openTeamModal(key)}
                                                >
                                                    {team.username}
                                                </Link>
                                            ) : (
                                                <Text>
                                                    {team.username}
                                                </Text>
                                            )
                                            }
                                                
                                            </Td>
                                            <Td>
                                                {/*Make link */}
                                                {team.email}
                                            </Td>
                                            <Td>
                                                <Text>{team.status}</Text>
                                            </Td>
                                            <Td>
                                                {moment(team.createdAt).format(
                                                    "DD/MM/YYYY HH:mm"
                                                )}
                                            </Td>
                                            <Td>
                                                {moment(team.lastAccess).format(
                                                    "DD/MM/YYYY HH:mm"
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <TeamModal/>
                        <Tooltip id={"tooltip-delete-user"} style={{ zIndex: "9999" }} />
                        <Tooltip id={"tooltip-reset-lab"} style={{ zIndex: "9999" }} />
                    </>
                )}
                </>
            )}
            
        </>
    );
}

export default EventTeamsTable;
