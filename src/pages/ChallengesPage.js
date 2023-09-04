import { Flex, Grid, GridItem, VStack, Text, StackDivider } from '@chakra-ui/react';
import React from 'react'
import AddProfileCard from '../components/challenges/AddProfileCard';
import ChallengeProfileSelectorCard from '../components/challenges/ChallengeProfileSelectorCard';
import ChallengeSelectorCard from '../components/challenges/ChallengeSelectorCard';


export default function ChallengesPage() {
  return (
            <Grid
            height="100%"
            width="100%"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={24} colSpan={8} >
                <Flex direction="column" height="100%" className="container"bg="tomato">
                <VStack
                spacing="auto"
                align='stretch'
                >
                    <AddProfileCard/>
                    <ChallengeProfileSelectorCard/>
                    <ChallengeSelectorCard/>
                </VStack>
                   
                </Flex>
            </GridItem>
            <GridItem rowSpan={24} colStart={11} colSpan={13} >
                <Flex direction="column" height="100%" className="container" bg="blue">
                    
                </Flex>
            </GridItem>
        </Grid>
  );
}

