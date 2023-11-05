import { Center, Flex, Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import AddProfileCard from './AddProfileCard'
import Logo from '../Logo'

function ProfileInfoCard() {
  return (
    <Grid 
            height="100%"
            width="100%"
            minW="850px"
            minH="600px"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
    >
       
        <GridItem rowSpan={6} colSpan={13}>
        
        </GridItem>
        <GridItem rowSpan={24} colSpan={9} >
        <Center h='100%'>
        <Logo white="false" marginBottom={10}></Logo>
        </Center>
        </GridItem>
        <GridItem rowSpan={12} colSpan={13}>
        <VStack align={"right"} spacing={"20px"} marginLeft={"30px"}>
            <Text fontSize={"30px"}>Welcome to the profile page</Text>
            <Text fontSize={"17px"}>There is currently no challenge profiles saved.</Text>
            <Flex maxWidth={"400px"}>
                <AddProfileCard/>
            </Flex>
        </VStack> 
            
        </GridItem>

        <GridItem rowSpan={6} colSpan={13} ></GridItem>
    </Grid>
    
    
  )
}

export default ProfileInfoCard