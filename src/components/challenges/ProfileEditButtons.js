import React, { useState } from 'react'
import { deleteProfile, fetchProfiles } from '../../features/profiles/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import ProfileDialogDelete from './ProfileDialogDelete';
function ProfileEditButtons() {  
    const dispatch = useDispatch();
    
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const onAlertClose = () => setIsAlertOpen(false)
    const cancelRef = React.useRef()

    const [profileNameState, setProfileNameState] = useState(selectedProfile.name)
    const doDeleteProfile = (profileName) => {
        let profile = {
            name: profileName.toLowerCase()
        }
        dispatch(deleteProfile(profile))
        dispatch(fetchProfiles())
        }
    const openAlertDialog = (profileName) => {
        setProfileNameState(profileName)
        // setIndexState(index)
        setIsAlertOpen(true)
        }

    
    
  return (
    <>
    <div>ProfileEditButtons</div>
    <Flex
        width={"100%"}
        marginTop="20px"
        justifyContent={"center"}
    >
            <Button
                
                colorScheme="aau.buttonRed"
                color="white"
                onClick={() => openAlertDialog(selectedProfile.name)}         
                marginRight="30px"         
            >
                Delete Profile
            </Button>
        
            <Button
                colorScheme="aau.button"
                color="white"
                type="submit"
                // onClick={() => openAlertDialog(selectedProfile.name)}                  
            >
                Edit Profile
            </Button>
    </Flex>
             <ProfileDialogDelete 
                    profileName={profileNameState}
                    isOpen={isAlertOpen}
                    onClose={onAlertClose}
                    cancelRef={cancelRef}
                    deleteProfile={doDeleteProfile}
            ></ProfileDialogDelete>
    </>
    
  )
}

export default ProfileEditButtons