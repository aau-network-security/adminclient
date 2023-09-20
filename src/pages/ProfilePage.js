import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelf, updateUser } from "../features/users/userSlice";

export default function ProfilePage() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user.loggedInUser);
    const toast = useToast()
    const toastIdRef = useRef()
    const [shortName, setShortName] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        if (currentUser && currentUser.user) {
            setShortName(currentUser.user.FullName.split(" ")[0]);
            const roleSplit = currentUser.user.Role.split("::")[1];
            setRole(roleSplit[0].toUpperCase() + roleSplit.slice(1));
        }
    }, [currentUser]);

    const [email, setEmail] = useState("")
    const updateEmail = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            toastIdRef.current = toast({
                title: 'No change detected',
                description: "Enter a new email and press the edit button",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        } else if (!email.replace(/\s/g, '').length) {
            toastIdRef.current = toast({
                title: 'No change detected',
                description: "Enter a new email and press the edit button",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setEmail("")
            return
        } else if (!emailRegex.test(email)) {
            toastIdRef.current = toast({
                title: 'Email is not valid',
                description: "Please enter a valid email",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return
        }
        try {
            const user = {
                username: currentUser.user.Username,
                email: email
            }
            const response = await dispatch(updateUser(user)).unwrap()
            // console.log("user add response: ", response)
            toastIdRef.current = toast({
                title: 'Success',
                description: "Successfully updated email",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            dispatch(fetchSelf())
            setEmail("")
        }
        catch (err) {
            toastIdRef.current = toast({
                title: 'Error updating user',
                description: err.apiError.status,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    // Update password modal
    const { isOpen: isUpdatePasswordModalOpen, onOpen: onUpdatePasswordModalOpen, onClose: onUpdatePasswordModalClose } = useDisclosure()
    const UpdatePasswordModal = () => {
        const [ currPassword, setCurrPassword ] = useState("")
        const [ newPassword, setNewPassword ] = useState("")
        const [ repeatPassword, setRepeatPassword ] = useState("")
        const updatePassword = async (e) => {
            e.preventDefault()
            console.log("updating password")
            if (newPassword.length < 8) {
                toastIdRef.current = toast({
                    title: 'Error updating password',
                    description: 'Password must be at least 8 characters',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                return
            } else if (newPassword != repeatPassword) {
                toastIdRef.current = toast({
                    title: 'Error updating password',
                    description: 'Passwords must match',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                return
            }
            try {
                const user = {
                    username: currentUser.user.Username,
                    password: newPassword,
                    verifyAdminPassword: currPassword
                }
                const response = await dispatch(updateUser(user)).unwrap()
                // console.log("user add response: ", response)
                toastIdRef.current = toast({
                    title: 'Success',
                    description: "Successfully updated password",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
                dispatch(fetchSelf())
                onUpdatePasswordModalClose()
            }
            catch (err) {
                toastIdRef.current = toast({
                    title: 'Error updating password',
                    description: err.apiError.status,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        return (
            <Modal isOpen={isUpdatePasswordModalOpen} onClose={onUpdatePasswordModalClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={updatePassword}>
                    <ModalHeader>Update your password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} p="1rem">
                            <FormControl isRequired>
                                <FormLabel>Current password</FormLabel>
                                <InputGroup>
                                    <Input
                                        backgroundColor="#f7fafc"
                                        borderColor="#edf3f8"
                                        focusBorderColor="#c8dcea"
                                        type="password"
                                        name="currPassword"
                                        value={currPassword}
                                        onChange={(e) => setCurrPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>New password</FormLabel>
                                <InputGroup>
                                    <Input
                                        backgroundColor="#f7fafc"
                                        borderColor="#edf3f8"
                                        focusBorderColor="#c8dcea"
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Repeat new password</FormLabel>
                                <InputGroup>
                                    <Input
                                        backgroundColor="#f7fafc"
                                        borderColor="#edf3f8"
                                        focusBorderColor="#c8dcea"
                                        name="repeatPassword"
                                        type="password"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button width="100px" variant='solid' colorScheme="aau.button" type="submit">Save</Button>
                    </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        )
    }

    return (
        <>
            {currentUser && currentUser.user && (
                <Center w="100%" height="100%">
                    <VStack height="75%" width="400px">
                        <Flex direction={"column"} width="100%" height="100%">
                            <Center display="flex" flexDir="column">
                                <Text
                                    fontSize="30px"
                                    marginBottom="20px"
                                    lineHeight="1.3"
                                >
                                    Hi,
                                    <Text>
                                        <b>{shortName}!</b>
                                    </Text>
                                </Text>
                                <Avatar
                                    name={currentUser.user.FullName}
                                    size="2xl"
                                    // TODO: add avatar picture to user
                                    //src="https://i.pinimg.com/1200x/26/d9/20/26d920dbe05e3f894a17781b8201123f.jpg"
                                    marginBottom="10px"
                                />
                                <Flex>
                                    <Flex marginRight="20px">
                                        <Icon
                                            as={MdSecurity}
                                            fontSize="20px"
                                            marginRight="5px"
                                        />
                                        <Text>
                                            <b>{role}</b>
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        <Icon
                                            as={FaRegBuilding}
                                            fontSize="20px"
                                            marginRight="5px"
                                        />
                                        <Text>
                                            <b>
                                                {currentUser.user.Organization}
                                            </b>
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Center>
                        </Flex>
                        <Flex direction={"column"} width="100%" height="100%">
                            <form>
                                <Stack spacing={4} p="1rem">
                                <FormControl>
                                        <FormLabel>Username</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="username"
                                                placeholder={
                                                    currentUser.user.Username
                                                }
                                                boxShadow="md"
                                                isReadOnly
                                            />
                                        </InputGroup>
                                    </FormControl>
                                <FormControl>
                                        <FormLabel>Full name</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="fullName"
                                                placeholder={
                                                    currentUser.user.FullName
                                                }
                                                boxShadow="md"
                                                isReadOnly
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <Input
                                                placeholder={
                                                    currentUser.user.Email
                                                }
                                                name="email"
                                                type="email"
                                                boxShadow="md"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <InputRightElement>
                                                <IconButton
                                                    colorScheme="aau.button"
                                                    variant="solid"
                                                    icon={<Icon as={RiEditLine} />}
                                                    onClick={updateEmail}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                            </form>
                            <Center>
                                <Button
                                    borderRadius={0}
                                    variant="solid"
                                    colorScheme="aau.button"
                                    color="white"
                                    width="50%"
                                    onClick={onUpdatePasswordModalOpen}
                                >
                                    Update password
                                </Button>
                            </Center>
                        </Flex>
                    </VStack>
                </Center>
            )}
            <UpdatePasswordModal />
        </>
    );
}
