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
import { selectProfile } from "../../features/profiles/profileSlice";
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
            dispatch(selectProfile(profiles[1]));
        }
    }, [profiles]);

    console.log(selectedProfile)
    
   
    return (
        <>
        <Box
            height="40px"
            borderRadius="10px"
            // className="container"
            padding="0"
        >
        {Object.entries(profiles).map(([key, profile]) => (
            <Flex
                key={key}
                width="100%"
                height="50px"
                padding="0 10px 0 10px"
                alignItems="center"
                borderRadius="10px 10px 10px 10px"
                _hover={{ backgroundColor: "#211a52", color: "#fff" }}
                backgroundColor={
                    selectedProfile.tag === profile.tag
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedProfile.tag === profile.tag
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
                                                "Challenge is secret"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-secret-exercise"
                                            data-tooltip-offset={3}
                                        />
                                    )}
            </Flex>
        ))}

        </Box>
        </>
        // <Text> ChallengeSelectorCard</Text>
        );
}

export default ProfileSelectorCard