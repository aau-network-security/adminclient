import { Box, Button, Center, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlinedFlag } from "react-icons/md";

function AddProfileCard() {
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
                            color="#211a52"
                        />
                        <Flex flexDir="column" marginLeft="20px">
                            <Text fontWeight="bold">
                                Create a profile
                            </Text>
                            <Text>Create your challenge set.</Text>
                        </Flex>
                    </Center>
                </Flex>

                <Flex flexDir="column" h="100%" w="20%">
                    <Button
                        backgroundColor="#211a52"
                        _hover={{ backgroundColor: "#18123a" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        marginBottom="1px"
                        h="100%"
                    >
                        <Icon as={FiPlus} fontSize="40px" />
                    </Button>
                </Flex>
            </HStack>
        </Box>
  );
}

export default AddProfileCard;