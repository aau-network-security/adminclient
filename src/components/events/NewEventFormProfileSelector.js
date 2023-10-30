import {
    Flex,
    Grid,
    GridItem,
    Icon,
    Spacer,
    Text,
    VStack,

} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchProfiles, selectProfile } from "../../features/profiles/profileSlice";


import { GoStop } from "react-icons/go";
import ProfileNameCard from "../challenges/ProfileNameCard";
import ProfileDescriptionCard from "../challenges/ProfileDescriptionCard";
import ChallengesProfileCard from "../events/ChallengesProfileCard";
import { isEmpty } from "lodash";



function NewEventFormProfileSelector( {
    reqData,
    setReqDataState
  }) {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    
    const challengesOrProfile = useSelector((state) => state.challenge.selector);

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [challengesOrProfile]);

    useEffect(() => {
        if (challengesOrProfile  === "profiles") {  
            if (profiles.length === 0){
                dispatch(fetchProfiles());
            } else if (isEmpty(selectedProfile)){
                dispatch(selectProfile(profiles[0]))
            }else {
                var updatedProfile = profiles.filter(item => item.id === selectedProfile.id);
                // console.log(updatedProfile.length)
                if (updatedProfile.length === 0){
                        // console.log("updated profile id is undefined")
                        dispatch(selectProfile(profiles[0]));
                } else if (updatedProfile[0] === selectedProfile) {
                            dispatch(selectProfile(updatedProfile[0]))
                }else {
                            dispatch(selectProfile(updatedProfile[0]))
                        }
            } 
    }
    }, [challengesOrProfile,selectedProfile,profiles]);





    var initialExerciseTags = [] 
    useEffect(() => {
    if (selectedProfile.exercises !== undefined){
        // console.log("use effect update reqdata for ex tags")
        if (Object.keys(selectedProfile.exercises).length > 0){
            initialExerciseTags = selectedProfile.exercises.map(exercise => exercise.Tag)
            setReqDataState(reqData => ({
                ...reqData,
                ["exerciseTags"]: initialExerciseTags
            }));
            // console.log("tags for editing profile",initialExerciseTags)
            // console.log("reqData tags",reqData)
        }   
        }
    }, [selectedProfile,challengesOrProfile,profiles]);
    

  return (
    <>

    <Grid
            templateColumns="repeat(6, 1fr)"
            gap={4}
            width="60%"
            marginLeft="20px"
            height="inherit"
            maxH="700px"
        >
        <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                width="100%"
                marginRight="10px"
                borderRadius="5px"
                overflowY="auto"
                colSpan={2}
                maxH="650px"
            >

            {Object.entries(profiles).map(([key, profile]) => (
            <Flex
                key={key}
                width="100%"
                height="50px"
                padding="0 10px 0 10px"
                alignItems="center"
                
                _hover={{ backgroundColor: "#211a52", color: "#fff" }}
                backgroundColor={
                    selectedProfile.id === profile.id
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfile.id === profile.id
                        ? "#fff"
                        : "#211a52"
                }
                onClick={() => dispatch(selectProfile(profile))}
            >
                <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    cursor="default"
                >
                    {profile.name}
                </Text>
                <Spacer/>
                {profile.secret && (
                                        <Icon
                                            color="orange.500"
                                            as={GoStop}
                                            fontSize="16px"
                                            marginRight="3px"
                                            data-tooltip-html={
                                                "Profile is secret"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-secret-exercise"
                                            data-tooltip-offset={6}
                                        />
                                    )}
            </Flex>
        ))}
        </GridItem>
        <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                width="100%"
                marginRight="10px"
                borderRadius="5px"
                overflowY="auto"
                colSpan={4}
                maxH="650px"
            >
             <Flex direction="column" height="100%" bg={"#f7fafc"} padding={"0px 0px 0px 0px"} borderRadius="10px" maxH="900px" className="container">
                        <VStack
                        spacing="0px"
                        align='stretch'
                        >
                            <ProfileNameCard/>
                            <ProfileDescriptionCard/>
                            <ChallengesProfileCard reqData={reqData} setReqDataState={setReqDataState}/>
                    
                        </VStack>
                    </Flex>
            </GridItem>

    </Grid>
    </>

  )
}

export default NewEventFormProfileSelector