import { Box, Button, Center, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { MdArrowForward } from "react-icons/md";
import { MdOutlinedFlag } from "react-icons/md";
import { NavLink as ReactLink } from "react-router-dom";
function GotoChallengesCard() {
    return (
        <Box
            backgroundColor="white"
            minWidth="400px"
            height="85px"
            borderRadius="10px"
            className="container"
            padding="0"
        >
            <HStack h="100%">
                <Flex flexDir="row" w="80%">
                    <Center w="100%">
                        <Icon
                            as={MdOutlinedFlag}
                            fontSize="30px"
                            color="aau.primary"
                        />
                        <Flex flexDir="column" marginLeft="20px">
                            <Text fontWeight="bold">
                                Go to challenges
                            </Text>
                            <Text>View challenges and profiles</Text>
                        </Flex>
                    </Center>
                </Flex>

                <Flex flexDir="column" h="100%" w="20%">
                    <Button
                        colorScheme="aau.button"
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        marginBottom="1px"
                        h="100%"
                        as={ReactLink}
                        to={"/challenges"}
                    >
                        <Icon as={MdArrowForward} fontSize="40px" />
                    </Button>
                </Flex>
            </HStack>
        </Box>
    );
}

export default GotoChallengesCard;
