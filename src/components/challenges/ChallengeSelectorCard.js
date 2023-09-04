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
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExercises,
    selectCategory,
} from "../../features/exercises/exerciseSlice";

function ChallengeSelectorCard() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.exercise.categories);
    const selectedCategory = useSelector(
        (state) => state.exercise.selectedCategory
    );
    const exercises = useSelector((state) => state.exercise.exercises);
    const fetchingExercises = useSelector(
        (state) => state.exercise.fetchingExercises
    );

    useEffect(() => {
        if (categories.length > 0) {
            dispatch(selectCategory(categories[0]));
            var reqObj = {
                category: categories[0].tag,
            };
            dispatch(fetchExercises(reqObj));
        }
    }, [categories]);

    useEffect(() => {
        console.log("fetching exercises for: ", selectedCategory);
        if (Object.keys(selectedCategory).length > 0) {
            console.log("fetching exercises for: ", selectedCategory.tag);
            var reqObj = {
                category: selectedCategory.tag,
            };
            dispatch(fetchExercises(reqObj));
        }
    }, [selectedCategory]);

    return (
        <>
        {Object.entries(categories).map(([key, category]) => (
            <Flex
                key={key}
                width="100%"
                height="50px"
                padding="0 10px 0 10px"
                alignItems="center"
                _hover={{ backgroundColor: "#211a52", color: "#fff" }}
                backgroundColor={
                    selectedCategory.tag === category.tag
                        ? "#211a52"
                        : "#f7fafc"
                }
                color={
                    selectedCategory.tag === category.tag
                        ? "#fff"
                        : "#211a52"
                }
                onClick={() => dispatch(selectCategory(category))}
            >
                <Text
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    cursor="default"
                >
                    {category.name}
                </Text>
                <Spacer></Spacer>
                <Icon
                    color="grey"
                    position="relative"
                    top="-5px"
                    right="0"
                    marginLeft={1}
                    as={FaRegQuestionCircle}
                    fontSize="13px"
                    cursor="pointer"
                    
                    zIndex="999"
                />
            </Flex>
        ))}
        </>
        // <Text> ChallengeSelectorCard</Text>
        );
}

export default ChallengeSelectorCard