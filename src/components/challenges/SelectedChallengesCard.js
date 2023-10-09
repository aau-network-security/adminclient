import { 
    Grid, 
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    Icon,
    Text,
    HStack,
    Spacer

    } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProfile, fetchSelectedExercises } from '../../features/profiles/profileSlice';
import { Tooltip } from "react-tooltip";
import { FaRegQuestionCircle } from "react-icons/fa";

function CharacterLimitedText({ text, maxLength }) {
    const [isTruncated, setIsTruncated] = useState(true);
  
    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };

  
    return (
      <Text  fontSize={"15px"} onClick={toggleTruncate}>
        {isTruncated ? text.slice(0, maxLength): text}
      </Text>
    );
  }

function SelectedChallengesCard({reqData,setReqDataState}) {
    const selectedExercises = useSelector((state) => state.profile.selectedExercises);
    const dispatch = useDispatch();
    useEffect(() => {
        if (reqData.exerciseTags.length > 0){
            console.log(reqData.exerciseTags)
            var reqObj = {
                tags: reqData.exerciseTags
            }
            dispatch(fetchSelectedExercises(reqObj));
            // console.log("reqdata", reqData.exerciseTags)
            // console.log("selectedExercises",selectedExercises)
    }else {
        dispatch(clearSelectedProfile())
    }
    },[reqData])
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
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
    <>
    <Text 
        fontSize={"17px"}
        marginBottom={1}
        color="aau.primary"
    >Selected Challenges:</Text>
    <Grid 
    // info: med tooltip kunne være 
    // height="100%"
    // width="100%"
    // minW="100px"
    // minH="850px"
    maxH="220px"
    overflowY="auto"
    templateRows="repeat(24, 1fr)"
    templateColumns="repeat(24, 1fr)"
    gap={1}>
        {Object.entries(selectedExercises).map(([key, exercise]) => (
            <GridItem rowSpan={8} colSpan={12} bg="#f7fafc" key={key} 
            rounded={"5px"}
            border={"1px"}
            borderColor={"gray.200"}
            color="aau.primary"
            >
                <HStack marginLeft={"5px"}>
                <CharacterLimitedText text={exercise.name} maxLength={20}/>
                <Icon
                                        color="grey"
                                        position={"relative"}
                                        top="-2px"
                                        left="-4px"
                                        as={FaRegQuestionCircle}
                                        fontSize="13px"
                                        cursor="pointer"
                                        onClick={() => openModal(exercise)}
                                        zIndex="999"
                                    />
            </HStack>
            
            </GridItem>
        ))}
    
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
    </>
    
  )
}

export default SelectedChallengesCard