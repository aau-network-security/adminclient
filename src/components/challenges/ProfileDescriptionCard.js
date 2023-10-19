import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, FormLabel, InputGroup, Input, useEditableControls, IconButton, Editable, EditablePreview, EditableInput, EditableTextarea, useEditableState, useToast, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { fetchProfiles, selectProfile, updateProfile } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';
import { defaultTheme } from "../..";





function ProfileDescriptionCard() {
  
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    return  (
    <>     
    <Flex flexDir="column" h="100%" w="100%" padding="5px 20px 10px 20px" bg={"#f7fafc"} maxH="150px" overflowY="auto">
        <Text whiteSpace="pre-line" >{selectedProfile.description}</Text>
    </Flex> 
    </>
  
  )
}

export default ProfileDescriptionCard