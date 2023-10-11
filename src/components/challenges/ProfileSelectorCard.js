import {
    Center,
    Checkbox,
    CheckboxGroup,
    Flex,
    FormControl,
    Grid,
    GridItem,
    Icon,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Box,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExercises,
    selectCategory,
} from "../../features/exercises/exerciseSlice";
import { clearSelectedProfile, selectProfile } from "../../features/profiles/profileSlice";
import { Tooltip } from "react-tooltip";
import { IoIosWarning } from "react-icons/io";








function ProfileSelectorCard() {
    const dispatch = useDispatch();

    const profiles = useSelector((state) => state.profile.profiles);
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
        
    useEffect(() => {
        if (profiles.length > 0) {
            // console.log("useeffect profileselector")
            if (selectedProfile.name === undefined){
                dispatch(selectProfile(profiles[0]));
            }
            console.log(selectedProfile)
        }else{
             dispatch(clearSelectedProfile());
        }
    }, [profiles]);


   
    return (
        <>
         <Grid
            templateColumns="repeat(6, 1fr)"
            gap={4}
            width="100%"
            // marginLeft="20px"
            height="inherit"
            maxH="650px"
            overflowY="auto"
            borderRadius="5px"
        >
            <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                width="100%"
                marginRight="10px"
                borderRadius="5px"
                overflowY="auto"
                colSpan={6}
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
                    selectedProfile.name === profile.name
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfile.name === profile.name
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
                <Spacer></Spacer>
                {profile.secret && (
                                        <Icon
                                            color="aau.red"
                                            as={IoIosWarning}
                                            fontSize="16px"
                                            marginRight="3px"
                                            data-tooltip-html={
                                                "Profile is secret"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-secret-exercise"
                                            data-tooltip-offset={3}
                                        />
                                    )}
            </Flex>
        ))}
        </GridItem>
        </Grid>
        
        </>
        
        );
}

export default ProfileSelectorCard