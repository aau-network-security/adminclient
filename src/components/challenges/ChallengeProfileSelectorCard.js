import { Box, Button, Center, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";

function ChallengeProfileSelectorCard() {
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
                backgroundColor="#211a52"
                _hover={{ backgroundColor: "#18123a" }}
                color="white"
                borderRadius="10px 0px 0px 10px"
                marginBottom="1px"
                h="100%"
            >
                Challenges
            </Button>
        </Flex>
        <Flex flexDir="column" h="100%" w="50%">
            <Button
                backgroundColor="#211a52"
                _hover={{ backgroundColor: "#18123a" }}
                color="white"
                borderRadius="0px 10px 10px 0px"
                marginBottom="1px"
                h="100%"
            >
                Profiles
            </Button>
        </Flex>
    </HStack>
</Box>
  )
}

export default ChallengeProfileSelectorCard