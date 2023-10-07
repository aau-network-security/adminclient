import {
    Box,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import ReactDatePicker from "react-datepicker";
import { FaCalendar, FaRegQuestionCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function NewProfileFormInputs({ reqData, changeHandler, setReqDataState }) {
    
    return (
        <Box width="40%">
            <FormControl marginBottom={7} isRequired>
                <FormLabel fontSize="17px" color="aau.primary">
                    Profile Name (Max: 30)
                </FormLabel>
                <InputGroup>
                    <Input
                        type="text"
                        name="profileName"
                        placeholder="Profile Name"
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="30"
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
            </FormControl>
            <FormControl marginBottom={7} isRequired>
                <FormLabel fontSize="17px" color="aau.primary">
                    Profile Description (Max: 300)
                    <Icon
                        color="grey"
                        position="relative"
                        top="-5px"
                        marginLeft={1}
                        as={FaRegQuestionCircle}
                        fontSize="13px"
                        data-tooltip-html={
                            'Write a description for your profile."'
                        }
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-profile-description"
                        data-tooltip-offset={15}
                    />
                </FormLabel>
                <InputGroup>
                    <Textarea
                        type="text"
                        name="profileDescription"
                        placeholder="Write a description for your profile."
                        backgroundColor="#f7fafc"
                        borderColor="#edf3f8"
                        focusBorderColor="#c8dcea"
                        maxLength="300"
                        height = "400px"
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
            </FormControl>
        </Box>
    );
}

export default NewProfileFormInputs;
