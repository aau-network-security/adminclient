import { Box, Button, Center, Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";
import { NavLink as ReactLink } from "react-router-dom";

function AddProfileCard() {
  return (
     
        <Button
                    backgroundColor="aau.primary"
                    _hover={{ backgroundColor: "#18123a" }}
                    color="white"
                    h="84px"
                    w="100%"
                    as={ReactLink}
                    to={"/challenges/new"}
                    padding={0}
                    rounded={"10px"}
                    margin="0"
                    data-tooltip-html={
                        'Click here to create a new profile'
                    }
                    data-tooltip-place="top"
                    data-tooltip-effect="solid"
                    data-tooltip-id="tooltip-create-profile"
                    data-tooltip-offset={15}
                >
            <HStack h="100%" w="100%">
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
                <Spacer/>
                <Flex flexDir="column" h="100%" w="20%">
                <Center h="100%">
                        <Icon as={FiPlus} fontSize="40px" />
                </Center>
                </Flex>
            </HStack>
            </Button>
    
  );
}

export default AddProfileCard;