import { Box, Button, Center, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";
import { NavLink as ReactLink } from "react-router-dom";

function AddProfileCard() {
  return (
        <Box
            backgroundColor="aau.primary"
            
            height="85px"
            borderRadius="10px"
            className="container"
            padding="0"
        >
            <Button
                        backgroundColor="#211a52"
                        _hover={{ backgroundColor: "#18123a" }}
                        color="white"
                        h="84px"
                        w="100%"
                        as={ReactLink}
                        to={"/challenges/new"}
                    >
            <HStack h="100%">
                <Flex flexDir="row" w="80%">
                
                    <Center w="100%">
                        <Icon
                            as={MdOutlinedFlag}
                            fontSize="30px"
                            color="white"
                        />
                        <Flex flexDir="column" marginLeft="20px">
                            <Text fontWeight="bold" color="white">
                                Create a profile
                            </Text>
                            <Text color="white">Create your challenge set.</Text>
                        </Flex>
                    </Center>
                    
                </Flex>

                <Flex flexDir="column" h="100%" w="20%">
                <Center h="100%">
                        <Icon as={FiPlus} fontSize="40px" />
                </Center>
                </Flex>
            </HStack>
            </Button>
        </Box>
  );
}

export default AddProfileCard;