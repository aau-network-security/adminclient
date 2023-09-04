import {
    Button,
    Flex,
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
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { fetchEventTeams } from "../../features/teams/teamSlice";
import { MdDelete, MdRefresh } from "react-icons/md";
import moment from "moment";
import { SearchIcon } from "@chakra-ui/icons";

function EventTeamsTable() {
    const teams = useSelector((state) => state.team.teams);
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
    const TeamModal = () => {
        let username = "";
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
                <ModalContent>
                    <ModalHeader>{username}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <ModalFooter>
                        <Button onClick={onTeamModalClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    };
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
                <InputGroup width="300px" margin="auto">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="#211A52" />
                    </InputLeftElement>
                    <Input type="tel" placeholder="Search teams" />
                </InputGroup>
            </Flex>
            <TableContainer overflowY="unset" h="88%">
                <Table variant="simple" size="sm">
                    <Thead
                        position="sticky"
                        top={0}
                        zIndex="100"
                        backgroundColor="white"
                    >
                        <Tr>
                            <Th textAlign="center">
                                Reset lab core/Delete user
                            </Th>
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
                                <Td width="200px" textAlign="center">
                                    <IconButton
                                        color={"#211A52"}
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
                                        colorScheme="red"
                                        variant="ghost"
                                        fontSize="20px"
                                        icon={<MdDelete />}
                                        data-tooltip-content="Delete user"
                                        data-tooltip-place="right"
                                        data-tooltip-effect="solid"
                                        data-tooltip-id="tooltip-delete-user"
                                    />
                                </Td>
                                <Td>
                                    <Link
                                        textDecoration="underline"
                                        _hover={{ color: "#211A52" }}
                                        fontWeight={600}
                                        onClick={() => openTeamModal(key)}
                                    >
                                        {team.username}
                                    </Link>
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
            <TeamModal />
            <Tooltip id={"tooltip-delete-user"} style={{ zIndex: "9999" }} />
            <Tooltip id={"tooltip-reset-lab"} style={{ zIndex: "9999" }} />
        </>
    );
}

export default EventTeamsTable;
