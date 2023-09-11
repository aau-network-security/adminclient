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


function ProfileSelectorCard() {
    return (
        <>
        <Text>Profiles list</Text>
        <Text>To Be implemented</Text>
        </>
        
        );
}

export default ProfileSelectorCard