import { Button, Center, Flex, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";

import { NavLink as ReactLink } from "react-router-dom";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";

function AddProfileCard() {
  return (
     <>
        <Button
                    backgroundColor="aau.primary"
                    _hover={{ backgroundColor: "#18123a" }}
                    color="white"
                    h="84px"
                    w="100%"
                    as={ReactLink}
                    to={"/challenges/new"}
                    padding="0px 20px 0px 20px"
                    rounded={"10px"}
                    margin="0"
                    boxShadow='md'
                    data-tooltip-html={
                        'Click here to create a new profile'
                    }
                    data-tooltip-place="top"
                    data-tooltip-effect="solid"
                    data-tooltip-id="tooltip-create-profile"
                    data-tooltip-offset={15}
                >
            <HStack h="100%" w="100%">

                
                    <Center w="100%">
                        <Icon
                            as={HiOutlinePuzzlePiece}
                            fontSize="40px"
                            color="white"
                        />
                        <Spacer/>
                        <Flex flexDir="column" >
                            <Text fontWeight="bold" color="white" className="hide-text">
                                Create a profile
                            </Text>
                            <Text color="white" className="hide-text">Create your challenge set.</Text>
                        </Flex>
                        <Spacer/>
                        <Icon as={FiPlus} fontSize="40px" /> 
                    </Center>
               
                
                
                
                
                
            </HStack>
            </Button>
            </>
    
  );
}

export default AddProfileCard;