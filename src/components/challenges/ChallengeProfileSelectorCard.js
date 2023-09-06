import { Box, Button, Center, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function ChallengeProfileSelectorCard() {



    const [selectedProfileChallenge, setSelectedProfileChallenge] = useState("");
    const setSelectorChallenges = () => setSelectedProfileChallenge("challenges");
    const setSelectorProfiles = () => setSelectedProfileChallenge("profiles");

  return (
    <Box
    minWidth="400px"
    height="40px"
    borderRadius="10px"
    className="container"
    padding="0"
>
    <HStack h="100%">
    <Flex flexDir="column" h="100%" w="50%">
            <Button
                _hover={{ backgroundColor: "#18123a" }}
                backgroundColor={
                    selectedProfileChallenge === "challenges"
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfileChallenge === "challenges"
                        ? "#fff"
                        : "#211a52"
                }
                
                borderRadius="10px 0px 0px 10px"
                marginBottom="1px"
                h="100%"
                onClick={() => setSelectorChallenges()}
            >
                Challenges
            </Button>
        </Flex>
        <Flex flexDir="column" h="100%" w="50%">
            <Button
                _hover={{ backgroundColor: "#18123a" }}
                backgroundColor={
                    selectedProfileChallenge === "profiles"
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfileChallenge === "profiles"
                        ? "#fff"
                        : "#211a52"
                }
                
                borderRadius="0px 10px 10px 0px"
                marginBottom="1px"
                h="100%"
                onClick={() => setSelectorProfiles()}
            >
                Profiles
            </Button>
        </Flex>
    </HStack>
</Box>
  )
}

export default ChallengeProfileSelectorCard