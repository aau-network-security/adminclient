import { 
    Flex, 
    Grid, 
    GridItem, 
    VStack, 
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Center,
} from '@chakra-ui/react';
import React, { useEffect, useState } from "react";

import AddProfileCard from '../components/challenges/AddProfileCard';
import ChallengeProfileSelectorCard from '../components/challenges/ChallengeProfileSelectorCard';
import { Tooltip } from "react-tooltip";
import ProfileSelectorCard from '../components/challenges/ProfileSelectorCard';

import ChallengesCard from '../components/challenges/ChallengesCard';
import ChallengesProfileCard from '../components/challenges/ChallengesProfileCard';
import SearchBarCard from '../components/challenges/SearchBarCard';

import ChallengeSelectorCard from '../components/challenges/ChallengeSelectorCard';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories } from '../features/exercises/exerciseSlice';
import ProfileDescriptionCard from '../components/challenges/ProfileDescriptionCard';
import ProfileNameCard from '../components/challenges/ProfileNameCard';
import { clearSelectedProfile, fetchProfiles, selectProfile } from '../features/profiles/profileSlice';
import ProfileEditButtons from '../components/challenges/ProfileEditButtons';
import ProfileInfoCard from '../components/challenges/ProfileInfoCard';
import Logo from '../components/Logo';
import { selectCategoryShow } from '../features/challenges/challengeSlice';
import { isEmpty } from 'lodash';
import { Navigate } from 'react-router-dom';



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
    setReqDataState, permissions}){
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    const profiles = useSelector((state) => state.profile.profiles);
    if (challengesOrProfile === "profiles"){
            if (profiles.length > 0){
                return (
                    <>
                    <Flex direction="column" height="100%" bg={"white"} padding={"40px 0px 0px 0px"} borderRadius="10px" maxH="900px" className="container">
                        <VStack
                        spacing="40px"
                        align='stretch'
                        >
                            <ProfileNameCard/>
                            <ProfileDescriptionCard/>
                            <ChallengesProfileCard reqData={reqDataState} setReqDataState={setReqDataState}/>
                            {permissions === "(read|write)"
                            ? <ProfileEditButtons/>
                            :<></>}
                    
                        </VStack>
                    </Flex>
                   
                    </>
                )
            }else {
                return (
                    <>
                    <Flex justifyContent={"center"}>
                        <Center marginTop={"300px"}>
                            <Logo white="false" marginBottom={10}></Logo>
                        </Center>
                    </Flex>
                    </>
                )
            }

        
    } else if (challengesOrProfile === "category"){
        return (
            <>
             <Flex direction="column" height="100%" bg={"white"} padding={5} borderRadius="10px" maxH="900px" className="container">
                <VStack
                    spacing="40px"
                    align='stretch'
                    >
                    <SearchBarCard/>
                    <ChallengesCard reqData={reqDataState} setReqDataState={setReqDataState}/>
                </VStack>
            </Flex>
            </>
        )
    }
}


export default function ChallengesPage() {
    const perms = useSelector((state) => state.user.loggedInUser.perms);
    var permissions = ""
    if (typeof perms !== "undefined") {
        if (perms.challengeProfiles != "(read|write)"){
            permissions = "read" 
            // console.log("no permission to")
        } else if (perms.challengeProfiles === "(read|write)"){
            permissions = "(read|write)"
        }
    }
    
    const dispatch = useDispatch();
    
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    
    const profiles = useSelector((state) => state.profile.profiles);
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
    const [reqDataState, setReqDataState] = useState({
        tag: "",
        exerciseTags: [],
    });
    
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProfiles());
    }, [dispatch]);
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => {
        dispatch(selectCategoryShow())
        setIsModalOpen(false);
    }

    const openModal = (content) => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (challengesOrProfile  === "profiles") {  
            if (profiles.length === 0){
                // console.log("openmodal")
                openModal("test")
                // dispatch(clearSelectedProfile())
            } else if (isEmpty(selectedProfile)){
                dispatch(selectProfile(profiles[0]))
                // console.log(profiles)
                setIsModalOpen(false)
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
                setIsModalOpen(false)
            } 
    }
    }, [challengesOrProfile,profiles,selectedProfile]);

    useEffect(() => {
        if (challengesOrProfile  === "profiles") {     
            if (profiles.length === 0){
                // console.log("openmodal")
                openModal("test")
            } else {
                // console.log("closemodal")
                setIsModalOpen(false);
            }
        }
    }, [challengesOrProfile,profiles]);
  return (
            <Grid
            height="100%"
            width="100%"
            minW="850px"
            minH="850px"
            templateRows="repeat(24, 1fr)"
            templateColumns="repeat(24, 1fr)"
            gap={4}
        >
            <GridItem rowSpan={24} colSpan={8} >
                {/* <Flex direction="column" height="100%" bg={"#f7fafc"} > */}
                <Flex direction="column" height="100%" bg={"white"} padding={5} borderRadius="10px" maxH="900px" className="container">
                <Box>
                <VStack
                spacing="40px"
                align='stretch'>
                    {permissions === "(read|write)"
                    ? <AddProfileCard/>
                    :<></>
                    }
                    
                    <ChallengeProfileSelectorCard/>
                    <DisplayCategoriesOrProfile/>
                </VStack>
                </Box>
                </Flex>
            </GridItem>
            <GridItem rowSpan={24} colStart={11} colSpan={13}>
                
                
                
                <ViewProfilesOrChallenges reqDataState={reqDataState}
                                    setReqDataState={setReqDataState}
                                    permissions={permissions}/>
                
               
                
            </GridItem>
            <Modal
                onClose={closeModal}
                isOpen={isModalOpen}
                isCentered
                width="100%"
                
                scrollBehavior="inside"
                size="5xl"
            >
                <ModalOverlay />
                <ModalContent
                    // height="fit-content"
                    // maxH="800px"
                    // overflowY="auto"
                >
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                        <ModalBody marginBottom="20px">
                    <ProfileInfoCard/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Tooltip id="tooltip-create-profile" />
            <Tooltip id="tooltip-private-profile" />
            <Tooltip style={{ zIndex: 999 }} id="tooltip-exercise-difficulity" />
        </Grid>
        
  );
}

