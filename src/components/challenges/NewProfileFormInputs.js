import {
    Box,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    Input,
    InputGroup,
    Textarea,
} from "@chakra-ui/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import SelectedChallengesCard from "./SelectedChallengesCard";

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
                            'Write a description for your profile.'
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
                        height = "160px"
                        resize={"none"}
                        onChange={(event) => changeHandler(event)}
                    />
                </InputGroup>
            </FormControl>
            
            <FormControl marginBottom={2}>
                <HStack spacing="3px">
                    <FormLabel fontSize="17px" color="aau.primary">
                       Publish:
                        <Icon
                        color="grey"
                        position="relative"
                        top="-5px"
                        marginLeft={1}
                        as={FaRegQuestionCircle}
                        fontSize="13px"
                        data-tooltip-html={
                            'Check in order to publish profile for anyone to see.'
                        }
                        data-tooltip-place="right"
                        data-tooltip-effect="solid"
                        data-tooltip-id="tooltip-profile-public"
                        data-tooltip-offset={15}
                    />
                    </FormLabel>
                    
                    <Checkbox 
                        name="publish"
                        onChange={(event) => changeHandler(event)}
                    />
                </HStack>
            </FormControl>
            <SelectedChallengesCard 
            reqData={reqData} 
            setReqDataState={setReqDataState}
            mode="create"/>
        </Box>
    );
}

export default NewProfileFormInputs;
