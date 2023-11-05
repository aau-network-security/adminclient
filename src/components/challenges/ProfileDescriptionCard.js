import {Text, Flex} from '@chakra-ui/react'
import React from 'react'

import { useSelector } from 'react-redux';
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