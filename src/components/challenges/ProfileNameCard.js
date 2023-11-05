import { Text, Flex, Spacer} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux';
import ProfilePublishedCard from './ProfilePublishedCard';




function ProfileNameCard() {
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    return  (
    <>
    <Flex h="60px" w="100%" padding="5px 20px 10px 20px" bg={"#f7fafc"}>
        <Text fontSize={"30px"}> {selectedProfile.name} </Text>
        <Spacer/>
        <ProfilePublishedCard/>
    </Flex>  
    </>
  
  )
}

export default ProfileNameCard