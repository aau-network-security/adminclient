import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';

import { MdLockOutline, MdPublic} from "react-icons/md";
function ProfilePublishedCard() {
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
    if (selectedProfile.public === true){
        return (
            <Center>
                {/* <Text> Private </Text>  */}
                <Icon
                as={MdPublic}
                fontSize="30px"
                color="gray.700"
                data-tooltip-html={
                    "Profile is public"
                }
                data-tooltip-place="left"
                data-tooltip-effect="solid"
                data-tooltip-id="tooltip-private-profile"
                data-tooltip-offset={5}
            />        
            </Center>

        
    )
    } else {
        return (
                <Center>
                
                    <Icon
                    as={MdLockOutline}
                    fontSize="30px"
                    color="gray.700"
                    data-tooltip-html={
                        "Profile is private"
                    }
                    data-tooltip-place="left"
                    data-tooltip-effect="solid"
                    data-tooltip-id="tooltip-private-profile"
                    data-tooltip-offset={5}
                />        
                </Center>
            
        )
    }
}

export default ProfilePublishedCard