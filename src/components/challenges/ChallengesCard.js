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
import LoadingSpin from "react-loading-spin";
import { IoIosWarning } from "react-icons/io";
import { Tooltip } from "react-tooltip";



function ChallengesCard({
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
  const fetchingExercises = useSelector(
      (state) => state.exercise.fetchingExercises
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




  return (
    <div>ChallengesCard</div>
  )
}

export default ChallengesCard