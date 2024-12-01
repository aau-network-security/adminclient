import { Alert, AlertDescription, AlertIcon, Button, Center, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, updateUserOrg } from '../../features/users/userSlice'

function UpdateUserOrgModal({ isOpen, onClose, username }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.org.status)
    const selectedOrg = useSelector((state) => state.org.selectedOrg)

    const [updateUserOrgError, setUpdateUserOrgError] = useState('')
    const [reqData, setReqData] = useState ({
        newOrganization: ""
    })

    const toast = useToast()
    const toastIdRef = React.useRef()

    useEffect(() =>{
        if (selectedOrg !== null) {
            setReqData({...reqData, organization: selectedOrg.Name})
        }        
    },[selectedOrg])
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const submitForm = async (e) => {
        e.preventDefault()
        if (reqData.newOrganization === "") {
            setUpdateUserOrgError('Please fill out all fields')
            return
        }
        const actionPayload = {
            username: username,
            reqData: reqData
        }
        setIsSubmitting(true)
        try {
            const response = await dispatch(updateUserOrg(actionPayload)).unwrap()
            // console.log("user add response: ", response)
            setUpdateUserOrgError('')
            toastIdRef.current = toast({
                title: 'User organization successfully updated',
                description: `User ${username}'s organization has been updated`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setIsSubmitting(false)
            closeModal()
            if (selectedOrg != null) {
                dispatch(fetchUsers(selectedOrg.Name))
            } else {
                dispatch(fetchUsers(""))
            }
        }
        catch (err) {
            console.log(err)
            setUpdateUserOrgError(err.apiError.status)
            setIsSubmitting(false)
        }
        
    }
    const changeHandler = (e) => {
        setReqData({...reqData, [e.target.name]: e.target.value.trim()})
    }
    const closeModal = () => {
        setUpdateUserOrgError('')
        onClose()
    }
    return (
    <>
        <Modal onClose={closeModal} isOpen={isOpen} scrollBehavior='inside' size="xl">
        <ModalOverlay />
        <ModalContent minH="250px">
            {status === 'adding'
            ?
            <Center height="100%" width="100%" position="relative">
                <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
            </Center>
            :
            <>
                
                <form onSubmit={submitForm}>
                    <ModalHeader>Update {username}'s organization?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >
                                <FormControl>
                                    <FormLabel>Organization</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                        />
                                        <Input type="text" name="newOrganization" value={reqData.newOrganization} placeholder="Organization" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                {(updateUserOrgError !== '')
                                ?
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertDescription>{updateUserOrgError}</AlertDescription>
                                    </Alert>
                                :
                                    null
                                }
                            </Stack>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={closeModal}>Close</Button>
                    <Spacer />
                    <Button 
                        type='submit' 
                        colorScheme='aau.button'
                        color="white"
                        variant='solid'
                        isLoading={isSubmitting}
                    >Submit</Button>
                    </ModalFooter>
                </form>
            </>
            }
        </ModalContent>
        </Modal>
    </>
    )
}

export default UpdateUserOrgModal