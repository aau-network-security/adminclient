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
import ProfileInfoCard from '../components/challenges/ProfileInfoCard';
import Logo from '../components/Logo';
import { selectCategoryShow } from '../features/challenges/challengeSlice';


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
    const profiles = useSelector((state) => state.profile.profiles);
    if (challengesOrProfile === "profiles"){
            if (profiles.length > 0){
                return (
                    <>
                    <ProfileNameCard/>
                    <ProfileDescriptionCard/>
                    <ChallengesProfileCard reqData={reqDataState} setReqDataState={setReqDataState}/>
                    <ProfileEditButtons/>
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
            <SearchBarCard/>
            <ChallengesCard reqData={reqDataState} setReqDataState={setReqDataState}/>
        
            </>
        )
    }
}


export default function ChallengesPage() {

    const dispatch = useDispatch();
    
    const challengesOrProfile = useSelector((state) => state.challenge.selector);
    
    const profiles = useSelector((state) => state.profile.profiles);

    const [reqDataState, setReqDataState] = useState({
        tag: "",
        exerciseTags: [],
    });
    
    const changeHandler = (e) => {}

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
            console.log("openmodal")
            if (profiles.length === 0){
                openModal("test")
            } else {
                console.log("closemodal")
                setIsModalOpen(false);
            }
        }
    }, [profiles]);
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
                <Flex direction="column" height="100%" bg={"white"} padding={5} borderRadius="10px" maxH="900px">
                <Box>
                <VStack
                spacing="40px"
                align='stretch'>
                    <AddProfileCard/>
                    <ChallengeProfileSelectorCard/>
                    <DisplayCategoriesOrProfile/>
                </VStack>
                </Box>
                </Flex>
            </GridItem>
            <GridItem rowSpan={24} colStart={11} colSpan={13}>
                {/* <Flex direction="column" height="100%" bg={"#f7fafc"} > */}
                <Flex direction="column" height="100%" bg={"white"} padding={5} borderRadius="10px" maxH="900px">
                <VStack
                spacing="40px"
                align='stretch'
                >
                <ViewProfilesOrChallenges reqDataState={reqDataState}
                                    setReqDataState={setReqDataState}/>
                
                </VStack>
                </Flex>
            </GridItem>
            <Modal
                onClose={closeModal}
                isOpen={isModalOpen}
                isCentered
                width="100%"
                
                scrollBehavior="inside"
                size="4xl"
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
        </Grid>
  );
}

