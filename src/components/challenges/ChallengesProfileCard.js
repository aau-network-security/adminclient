import {
  Box,
  Button,
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
import { fetchSelectedExercises } from "../../features/profiles/profileSlice";
import { BsInfoCircle } from "react-icons/bs";

function ChallengesProfileCard({
  reqData,
  setReqDataState
}) {
 
  const dispatch = useDispatch();

  const selectedProfile = useSelector(
    (state) => state.profile.selectedProfile
    );
  const selectedExercises = useSelector((state) => state.profile.selectedExercises);
 
  
  const fetchingExercises = useSelector(
      (state) => state.profile.fetchingSelectedExercises
  );


  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (selectedProfile.exercises != null){
        if (Object.keys(selectedProfile.exercises).length > 0){
            var reqObj = {
                tags:[]
            }   
            reqObj.tags = selectedProfile.exercises.map(exercise => exercise.Tag)
            dispatch(fetchSelectedExercises(reqObj));
            console.log("reqObj",reqObj)
            console.log("selectedExercises",selectedExercises)
        }
    }
    
}, [selectedProfile]);


//   useEffect(() => {
//     console.log("fetching exercises for: ", selectedCategory);
//     if (Object.keys(selectedCategory).length > 0) {
//         console.log("fetching exercises for: ", selectedCategory.tag);
//         var reqObj = {
//             category: selectedCategory.tag,
//         };
//         dispatch(fetchExercises(reqObj));
//     }
// }, [selectedCategory]);


const openModal = (content) => {
  setModalTitle(content.name);
  if (typeof content.catDesc !== "undefined") {
      setModalContent(content.catDesc);
  } else {
      setModalContent(content.organizer_description);
  }
  setIsModalOpen(true);
};



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
                    {Object.entries(selectedExercises).map(([key, exercise]) => (
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
                                   
                                    <Icon
                                        color="grey"
                                        position={"relative"}
                                        top="1px"
                                        as={BsInfoCircle}
                                        fontSize="20px"
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

export default ChallengesProfileCard