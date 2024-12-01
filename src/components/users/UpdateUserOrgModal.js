import { Alert, AlertDescription, AlertIcon, Button, Center, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/users/userSlice'
import { set } from 'lodash'

function UpdateUserOrgModal({ isOpen, onClose, username }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.org.status)
    const selectedOrg = useSelector((state) => state.org.selectedOrg)
    const loggedInUser = useSelector((state) => state.user.loggedInUser)

    const [updateUserError, setUpdateUserError] = useState('')
    const [reqData, setReqData] = useState ({
        username: username,
        password: "",
        confirmPassword: "",
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
        reqData.username = username
        console.log("submitting form", reqData)
        if (reqData.password === "" || reqData.confirmPassword === "") {
            setUpdateUserError('Please fill out all fields')
            return
        }
        if (reqData.password !== reqData.confirmPassword) {
            setUpdateUserError('Passwords do not match')
            return
        }
        setIsSubmitting(true)
        try {
            const response = await dispatch(updateUser(reqData)).unwrap()
            // console.log("user add response: ", response)
            setUpdateUserError('')
            toastIdRef.current = toast({
                title: 'User password successfully updated',
                description: `User ${username}'s password has been updated`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            setIsSubmitting(false)
            closeModal()
        }
        catch (err) {
            console.log(err)
            setUpdateUserError(err.apiError.status)
            setIsSubmitting(false)
        }
        
    }
    const changeHandler = (e) => {
        setReqData({...reqData, [e.target.name]: e.target.value.trim()})
        if (e.target.name == "confirmPassword" && e.target.value.trim() !== reqData.password) {
            setUpdateUserError('Passwords do not match')
        } else if (e.target.name == "password" && e.target.value.trim() !== reqData.confirmPassword) {
            setUpdateUserError('Passwords do not match')
        } else {
            setUpdateUserError('')
        }
    }
    const closeModal = () => {
        setUpdateUserError('')
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
                    <ModalHeader>Update {username}'s password?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >
                                <FormControl>
                                <FormLabel>New password</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="password" name="password" placeholder="New password" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Confirm new password</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="password" name="confirmPassword" placeholder="Confirm new password" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                {(updateUserError !== '')
                                ?
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertDescription>{updateUserError}</AlertDescription>
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