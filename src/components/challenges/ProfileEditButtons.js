import React, { useState } from 'react'
import { deleteProfile, fetchProfiles } from '../../features/profiles/profileSlice'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
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
        <IconButton
            aria-label='Delete Profile'
            colorScheme='aau.buttonRed'
            variant='ghost'
            fontSize="20px"
            icon={<MdDelete />}
            onClick={() => openAlertDialog(selectedProfile.name)}                  
            /> 
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