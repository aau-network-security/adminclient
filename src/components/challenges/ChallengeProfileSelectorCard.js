import { Box, Button, Center, Flex, HStack, Icon, Text, withDefaultColorScheme } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { selectCategoryShow, selectProfileShow } from "../../features/challenges/challengeSlice";


function ChallengeProfileSelectorCard() {
    const dispatch = useDispatch();
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    
  return (
    <>
    <Box
    height="40px"
    borderRadius="10px"
    
    padding="0px"
>
    <HStack h="100%" w="100%" spacing={0}>
    <Flex flexDir="column" h="100%" w="50%">
            <Button
                _hover={{ backgroundColor: "aau.hover", color: "#fff" }}
                backgroundColor={
                    challengesOrProfile === "category"
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    challengesOrProfile === "category"
                        ? "#fff"
                        : "#211a52"
                }
                
                borderRadius="10px 0px 0px 10px"
                marginBottom="0px"
                h="100%"
                w="100%"
                padding="0px"
                onClick={() => dispatch(selectCategoryShow())}
            >
                Challenges
            </Button>
        </Flex>
        <Flex flexDir="column" h="100%" w="50%">
            <Button
                _hover={{ backgroundColor: "aau.hover", color: "#fff" }}
                backgroundColor={
                    challengesOrProfile === "profiles"
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    challengesOrProfile === "profiles"
                        ? "#fff"
                        : "#211a52"
                }
                
                borderRadius="0px 10px 10px 0px"
                marginBottom="0px"
                padding="0px"
                h="100%"
                w="100%"
                onClick={() => dispatch(selectProfileShow())}
            >
                Profiles
            </Button>
        </Flex>
    </HStack>
</Box>
</>
  )
}

export default ChallengeProfileSelectorCard