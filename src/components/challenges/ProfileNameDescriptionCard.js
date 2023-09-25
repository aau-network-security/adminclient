import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center} from '@chakra-ui/react'
import React from 'react'
import { MdEdit } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { selectProfile } from "../../features/profiles/profileSlice";
import { useSelector } from 'react-redux';

function ProfileNameDescriptionCard() {
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );


    return  (
    <>

        <Box
            className="container"
            padding="0"
            borderRadius="10px"
            >   
            <HStack h="100%" w="100%">
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px">
        <Text fontSize="30px">{selectedProfile.name}</Text>
        </Flex>
        <Spacer />

        <Flex flexDir="column" h="100%" w="10%" bg="#211a52" borderRadius="0px 10px 10px 0px">
        <Center w="100%" h="100%">
        <Icon
            as={FiEdit3}
            fontSize="30px"
            color="white"
            />
        </Center>
        </Flex>

        </HStack>
        </Box>
        
        <Box
            className="container"
            padding="0px 0px 0px 0px"
            borderRadius="10px"
            >   
        
        <HStack h="100%" w="100%">
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px"
        
        >
            <Text fontSize="15px" > {selectedProfile.description}</Text>
        </Flex>
        <Spacer />
        <Flex flexDir="column" h="100%" w="10%" bg="#211a52"  borderRadius="0px 10px 10px 0px">
        <Center w="100%" h="100%">
        <Icon
            as={FiEdit3}
            fontSize="30px"
            color="white"
            />
        </Center>
        </Flex>
        </HStack>
        </Box> 
        
    </>
  
  )
}

export default ProfileNameDescriptionCard