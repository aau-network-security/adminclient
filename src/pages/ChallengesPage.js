import { Flex, Grid, GridItem, VStack, Text, StackDivider } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";

import AddProfileCard from '../components/challenges/AddProfileCard';
import ChallengeProfileSelectorCard from '../components/challenges/ChallengeProfileSelectorCard';

import ProfileSelectorCard from '../components/challenges/ProfileSelectorCard';

import ChallengeSelectorCard from '../components/challenges/ChallengeSelectorCard';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchCategories } from '../features/exercises/exerciseSlice';


function DisplayChallengesOrProfile(){
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    if (challengesOrProfile === "profiles"){
        return (
            <ProfileSelectorCard/>
        )
    } else if (challengesOrProfile === "category"){
        return (
            <ChallengeSelectorCard/>
        )
    }
}


export default function ChallengesPage() {

    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


  return (
            <Grid
            height="100%"
            width="100%"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={24} colSpan={8} >
                <Flex direction="column" height="100%" className="container" bg={"#f7fafc"}>
                <VStack
                spacing="40px"
                align='stretch'
                >
                    <AddProfileCard/>
                    <ChallengeProfileSelectorCard/>
                    <DisplayChallengesOrProfile/>
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

