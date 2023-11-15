import {
    Flex,
    Grid,
    GridItem,
    Icon,
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
    
    selectCategory,
} from "../../features/exercises/exerciseSlice";
import { Tooltip } from "react-tooltip";

function ChallengeSelectorCard() {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.exercise.categories);
    const selectedCategory = useSelector(
        (state) => state.exercise.selectedCategory
    );
    
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        if (categories.length > 0) {
            if (selectedCategory.tag !== categories[0].tag){
                dispatch(selectCategory(categories[0]));
            }
            else{
                dispatch(selectCategory(categories[0]));
            }        
    
        }
    }, [categories,selectedCategory.tag,dispatch]);

    

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
        <Grid
            templateColumns="repeat(6, 1fr)"
            gap={4}
            width="100%"
            // marginLeft="20px"
            height="inherit"
            maxH="700px"
        >
            <GridItem
                backgroundColor="#f7fafc"
                height="inherit"
                width="100%"
                // marginRight="10px"
                borderRadius="5px"
                overflowY="auto"
                colSpan={6}
            >

            
        {Object.entries(categories).map(([key, category]) => (
            <Flex
                key={key}
                width="100%"
                height="50px"
                padding="0 10px 0 10px"
                alignItems="center"
                // borderRadius="10px 10px 10px 10px"
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
                    onClick={() => openModal(category)}
                    zIndex="999"
                />
            </Flex>
        ))}
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
        </>
        );
}

export default ChallengeSelectorCard