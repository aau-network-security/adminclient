import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AddProfileCard from './AddProfileCard'

function ProfileInfoCard() {
  return (
    <VStack>
    <Text fontSize={"25px"}> Welcome to the profiles page</Text>
    <Text fontSize={"17px"}> There is currently no challenge profiles saved.</Text>
    <Text fontSize={"17px"}> Create a profile to get started: </Text>
    <Flex maxWidth={"400px"}>
        <AddProfileCard/>
    </Flex>
 
    </VStack>
    
  )
}

export default ProfileInfoCard