import {
  Box,
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
import React, { useCallback, useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExercises,
  selectCategory,
} from "../../features/exercises/exerciseSlice";
import LoadingSpin from "react-loading-spin";
import { IoIosWarning } from "react-icons/io";
import { Tooltip } from "react-tooltip";

import { defaultTheme } from "../..";
import { cloneDeep, debounce } from "lodash";
import ChallengeLevel from "./ChallengeLevel";

function ChallengesCard({
  reqData,
  setReqDataState,
  challengesOrProfile
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


  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

 


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
        console.log(filteredExercises)}, [exercises])


  return (
  
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={4}
        width="100%"
        marginLeft="15px"
        height="100%"
        maxH="700px"
        
      >
            <GridItem
                backgroundColor="#f7fafc"
                height="100%"
                overflowY="auto"
                width="100%"
                borderRadius="5px"
                colSpan={6}
            >
                {fetchingExercises ? (
                    <Center h="100%" width="inherit" alignItems="center">
                        <LoadingSpin primaryColor={defaultTheme.colors.aau.primary} size="100px" />
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
                                    <Spacer/>
                                    <ChallengeLevel exercise={exercise}/>
                                    <Icon
                                        color="grey"
                                        position={"relative"}
                                        top="1px"
                                        as={FaRegQuestionCircle}
                                        fontSize="16px"
                                        cursor="pointer"
                                        onClick={() => openModal(exercise)}
                                        zIndex="999"
                                    />
                                </Flex>
                                
                    
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
  )
}

export default ChallengesCard