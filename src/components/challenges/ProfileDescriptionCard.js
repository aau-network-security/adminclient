import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, FormLabel, InputGroup, Input, useEditableControls, IconButton, Editable, EditablePreview, EditableInput, EditableTextarea, useEditableState} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { selectProfile } from "../../features/profiles/profileSlice";
import { useSelector } from 'react-redux';
import { defaultTheme } from "../..";





function ProfileDescriptionCard() {
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
    const [fieldValue, setFieldValue] = useState(selectedProfile.description);
    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getCancelButtonProps,
          getEditButtonProps,
          
        } = useEditableControls()
        
        return isEditing ?(
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            <Center w="100%" h="100%">
            <Button     {...getSubmitButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "#18123a" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        marginBottom="1px"
                        h="100%"
                        
                    >
                    <Icon
                        as={MdSave}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
            </Center>
            
            </Flex>
        ) : (
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            {/* <Center w="100%" h="100%"> */}
        <Button         {...getEditButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "aau.hover" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        marginBottom="1px"
                        h="100%"
                       
                        
                    >
                    <Icon
                        as={FiEdit3}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
        {/* </Center> */}
            
            </Flex>
        )
    }
    

    const handleSubmit = () => {
        console.log("Submitted Value:", fieldValue)
    }
    const handleFieldChange = (newValue) => {
        setFieldValue(newValue);
    }


    return  (
    <>  
    <Editable
        height="inherit"
        // defaultValue={selectedProfile.description}
        value={fieldValue}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        isPreviewFocusable={false}
        
        >      
        <Box
            className="container"
            padding="0px 0px 0px 0px"
            borderRadius="10px"
            
            >   
        
       
        
        <HStack h="100%" w="100%">
        
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px">
            <EditablePreview />
            <EditableTextarea style={{ height: "130px" }}/>
            {/* <Text fontSize="15px" > {selectedProfile.description}</Text> */}
        </Flex>
        {/* <Spacer /> */}
        
        <EditableControls style={{ height: "130px" }}/>
   
        </HStack>
       
        
        </Box> 
        </Editable>
        
    </>
  
  )
}

export default ProfileDescriptionCard