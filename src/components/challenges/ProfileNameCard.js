import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, InputGroup, Input, EditableInput, EditablePreview, Editable, useToast, EditableTextarea, useEditableControls} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { clearSelectedProfile, fetchProfiles, selectProfile, setProfileName, updateProfile } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';
import ProfilePublishedCard from './ProfilePublishedCard';




function ProfileNameCard() {
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    return  (
    <>
    <Flex h="100%" w="100%" padding="5px 20px 10px 20px" bg={"#f7fafc"}>
        <Text fontSize={"30px"}> {selectedProfile.name} </Text>
        <Spacer/>
        <ProfilePublishedCard/>
    </Flex>  
    </>
  
  )
}

export default ProfileNameCard