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
    Spinner,
    Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchExercises,
    selectCategory,
} from "../../features/exercises/exerciseSlice";
import LoadingSpin from "react-loading-spin";

import { GoStop } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import { defaultTheme } from "../..";
import ChallengeLevel from "../challenges/ChallengeLevel";
import { cloneDeep, debounce } from "lodash";

function NewEventFormChallengeSelector({
    reqData,
    changeHandler,
    setReqDataState,
}) {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.exercise.categories);
    const selectedCategory = useSelector(
        (state) => state.exercise.selectedCategory
    );
    const exercises = useSelector((state) => state.exercise.exercises);
    const [filteredExercises, setFilteredExercises] = useState("");
    const fetchingExercises = useSelector(
        (state) => state.exercise.fetchingExercises
    );
    const fetchingCategories = useSelector(
        (state) => state.exercise.fetchingCategories
    );
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

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
        if (Object.keys(selectedCategory).length > 0) {
            var reqObj = {
                category: selectedCategory.tag,
            };
            dispatch(fetchExercises(reqObj));
        }
    }, [selectedCategory]);

    const openModal = (content) => {
        setModalTitle(content.name);
        if (typeof content.catDesc !== "undefined") {
            setModalContent(content.catDesc);
        } else {
            setModalContent(content.organizer_description);
        }
        setIsModalOpen(true);
    };

const searchValue = useSelector((state) => state.challenge.searchParam);

const changeSearchData = (text, exercises) => { 
    if (text === "") {
        setFilteredExercises(cloneDeep(exercises));
      }else {
        setFilteredExercises(
            cloneDeep(
                exercises.filter((el) => {
                return (el.name.toLowerCase().indexOf(text.toLowerCase()) > -1 || el.organizer_description.toLowerCase().indexOf(text.toLowerCase()) > -1);
            })
            )
        )
    }
  };
  
  const debounceLoadData = useCallback(debounce(changeSearchData, 500), []);

      useEffect(() => {
        debounceLoadData(searchValue, exercises);
      }, [searchValue, exercises]);

      useEffect(() => {
        setFilteredExercises(exercises)
        // console.log(filteredExercises)
    }, [exercises])




    return (
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
            >
                {fetchingCategories ? (
                    <Center height="100%" width="100%" position="relative">
                        <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
                    </Center>
                ):(
                    <>
                        {Object.entries(categories).map(([key, category]) => (
                            <Flex
                                key={key}
                                width="100%"
                                height="50px"
                                padding="0 10px 0 10px"
                                alignItems="center"
                                _hover={{ backgroundColor: "aau.primary", color: "#fff" }}
                                backgroundColor={
                                    selectedCategory.tag === category.tag
                                        ? "aau.primary"
                                        : "#f7fafc"
                                }
                                color={
                                    selectedCategory.tag === category.tag
                                        ? "#fff"
                                        : "aau.primary"
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
                                    onClick={() => openModal(category)}
                                    zIndex="999"
                                />
                            </Flex>
                        ))}
                    </>
                )}
                
            </GridItem>

            <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                overflowY="auto"
                width="100%"
                borderRadius="5px"
                colSpan={4}
            >
                {fetchingExercises ? (
                    <Center height="100%" width="100%" position="relative">
                        <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
                    </Center>
                ) : (
                    <CheckboxGroup
                        value={reqData.exerciseTags}
                        onChange={(values) =>
                            setReqDataState({
                                ...reqData,
                                ["exerciseTags"]: values,
                            })
                        }
                        name="exercises"
                    >
                        {Object.entries(filteredExercises).map(([key, exercise]) => (
                            <Flex
                                key={key}
                                width="100%"
                                height="50px"
                                padding="0 10px 0 10px"
                                alignItems="center"
                            >
                                <Flex width="100%" marginRight="30px">
                                    <Text marginRight="5px">
                                        {exercise.name}
                                    </Text>
                                    {exercise.secret && (
                                        <Icon
                                            color="orange.500"
                                            as={GoStop}
                                            fontSize="16px"
                                            marginRight="3px"
                                            data-tooltip-html={
                                                "Challenge is secret"
                                            }
                                            data-tooltip-place="right"
                                            data-tooltip-effect="solid"
                                            data-tooltip-id="tooltip-secret-exercise"
                                            data-tooltip-offset={6}
                                        />
                                    )}
                                    <Icon
                                        color="grey"
                                        position={"relative"}
                                        top="1px"
                                        as={FaRegQuestionCircle}
                                        fontSize="13px"
                                        cursor="pointer"
                                        onClick={() => openModal(exercise)}
                                        zIndex="999"
                                    />
                                    <Spacer/>
                                    <ChallengeLevel exercise={exercise}/>
                                </Flex>

                                <FormControl width="50px">
                                    <InputGroup>
                                        <Checkbox value={exercise.tag} />
                                    </InputGroup>
                                </FormControl>
                            </Flex>
                        ))}
                    </CheckboxGroup>
                )}
            </GridItem>

            <Modal
                onClose={closeModal}
                isOpen={isModalOpen}
                isCentered
                width="700px"
                scrollBehavior="inside"
                size="3xl"
            >
                <ModalOverlay />
                <ModalContent
                    height="fit-content"
                    maxH="800px"
                    overflowY="auto"
                >
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody marginBottom="20px">
                        <Flex className="markdown-body">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: modalContent,
                                }}
                            />
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Tooltip style={{ zIndex: 999 }} id="tooltip-secret-exercise" />
        </Grid>
    );
}

export default NewEventFormChallengeSelector;
