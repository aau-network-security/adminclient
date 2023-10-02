import { Flex, Grid, GridItem, VStack, Text, StackDivider } from '@chakra-ui/react';
import React, { useEffect, useState } from "react";

import AddProfileCard from '../components/challenges/AddProfileCard';
import ChallengeProfileSelectorCard from '../components/challenges/ChallengeProfileSelectorCard';

import ProfileSelectorCard from '../components/challenges/ProfileSelectorCard';

import ChallengesCard from '../components/challenges/ChallengesCard';
import ChallengesProfileCard from '../components/challenges/ChallengesProfileCard';
import SearchBarCard from '../components/challenges/SearchBarCard';

import ChallengeSelectorCard from '../components/challenges/ChallengeSelectorCard';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../features/exercises/exerciseSlice';
import ProfileDescriptionCard from '../components/challenges/ProfileDescriptionCard';
import ProfileNameCard from '../components/challenges/ProfileNameCard';
import { fetchProfiles } from '../features/profiles/profileSlice';
import ProfileEditButtons from '../components/challenges/ProfileEditButtons';


function DisplayCategoriesOrProfile(){
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

function ViewProfilesOrChallenges({  reqDataState,
    setReqDataState}){
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    if (challengesOrProfile === "profiles"){
        return (
            <>
            <ProfileNameCard/>
            <ProfileDescriptionCard/>
            <ChallengesProfileCard reqData={reqDataState} setReqDataState={setReqDataState}/>
            <ProfileEditButtons/>
            </>
        )
    } else if (challengesOrProfile === "category"){
        return (
            <>
            <SearchBarCard/>
            <ChallengesCard reqData={reqDataState} setReqDataState={setReqDataState}/>
        
            </>
        )
    }
}


export default function ChallengesPage() {

    const dispatch = useDispatch();
    
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    const [reqDataState, setReqDataState] = useState({
        tag: "",
        exerciseTags: [],
    });
    
    const changeHandler = (e) => {}

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProfiles());
    }, [dispatch]);

    useEffect(() => {
        if (challengesOrProfile  === "profiles") {
            dispatch(fetchProfiles());
        }
    }, [challengesOrProfile]);

  return (
            <Grid
            height="100%"
            width="100%"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
            
        >
            <GridItem rowSpan={24} colSpan={8} >
                <Flex direction="column" height="100%" bg={"#f7fafc"} >
                <VStack
                spacing="40px"
                align='stretch'
                >
                    <AddProfileCard/>
                    <ChallengeProfileSelectorCard/>
                    <DisplayCategoriesOrProfile/>
                </VStack>
                </Flex>
            </GridItem>
            <GridItem rowSpan={24} colStart={11} colSpan={13} >
                <Flex direction="column" height="100%" bg={"#f7fafc"} >
                <VStack
                spacing="40px"
                align='stretch'
                >
                <ViewProfilesOrChallenges reqDataState={reqDataState}
                                    setReqDataState={setReqDataState}/>
                
                </VStack>
                </Flex>
            </GridItem>
        </Grid>
  );
}

