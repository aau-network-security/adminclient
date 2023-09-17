import {
    Avatar,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const currentUser = useSelector((state) => state.user.loggedInUser);
    const [shortName, setShortName] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        if (currentUser && currentUser.user) {
            setShortName(currentUser.user.FullName.split(" ")[0]);
            const roleSplit = currentUser.user.Role.split("::")[1];
            setRole(roleSplit[0].toUpperCase() + roleSplit.slice(1));
        }
    }, [currentUser]);
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
                                    src="https://i.pinimg.com/1200x/26/d9/20/26d920dbe05e3f894a17781b8201123f.jpg"
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
                                        <FormLabel>Full name</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type="text"
                                                name="fullName"
                                                placeholder={
                                                    currentUser.user.FullName
                                                }
                                                boxShadow="md"
                                            />
                                            <InputRightElement>
                                                <Button></Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <Input
                                                placeholder={
                                                    currentUser.user.Email
                                                }
                                                name="password"
                                                boxShadow="md"
                                            />
                                            <InputRightElement>
                                                <Button></Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Center>
                                        <Button
                                            borderRadius={0}
                                            variant="solid"
                                            colorScheme="aau.button"
                                            color="white"
                                            width="50%"
                                        >
                                            Update password
                                        </Button>
                                    </Center>
                                </Stack>
                            </form>
                        </Flex>
                    </VStack>
                </Center>
            )}
        </>
    );
}
