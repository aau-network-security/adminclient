import { Alert, AlertDescription, AlertIcon, Button, Center, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Spinner, useToast, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, updateUserRole } from '../../features/users/userSlice'

function UpdateRoleModal({ isOpen, onClose, username }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.org.status)
    const selectedOrg = useSelector((state) => state.org.selectedOrg)
    const loggedInUser = useSelector((state) => state.user.loggedInUser)

    const [updateRoleError, setUpdateRoleError] = useState('')
    const [reqData, setReqData] = useState ({
        newRole: ""
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
        if (reqData.newRole === "") {
            setUpdateRoleError('Please select a role')
            return
        }
        const actionPayload = {
            username: username,
            reqData: reqData
        }
        setIsSubmitting(true)
        try {
            const response = await dispatch(updateUserRole(actionPayload)).unwrap()
            // console.log("user add response: ", response)
            setUpdateRoleError('')
            toastIdRef.current = toast({
                title: 'User role successfully updated',
                description: `User ${username}'s role has been updated`,
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
            setUpdateRoleError(err.apiError.status)
            setIsSubmitting(false)
        }
        
    }
    const closeModal = () => {
        setUpdateRoleError('')
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
                    <ModalHeader>Update {username}'s role?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Select value={reqData.newRole} placeholder='Select role' onChange={(e) => setReqData({...reqData, newRole: e.target.value})}>
                                        {/* Conditional rendering to only show the roles that a user is authorized to create 
                                            TODO: Should make this dynamic at some point incase of new roles are added
                                        */}
                                        {(typeof loggedInUser.user !== 'undefined')
                                        &&
                                            <>
                                            {loggedInUser.user.Role === 'role::superadmin'
                                            && 
                                                <option value='superadmin'>Superadmin</option>
                                            }
                                            </>
                                        }
                                        {(typeof loggedInUser.user !== 'undefined')
                                        &&
                                            <>
                                            {(loggedInUser.user.Role === 'role::superadmin' || loggedInUser.user.Role === 'role::administrator')
                                            &&
                                                <>
                                                    <option value='administrator'>Administrator</option>
                                                    <option value='developer'>Developer</option>
                                                </>
                                            }
                                            </>
                                        }
                                        <option value='user'>User</option>
                                        <option value='npuser'>NpUser</option>
                                    </Select>
                                </FormControl>
                                {(updateRoleError !== '')
                                ?
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <AlertDescription>{updateRoleError}</AlertDescription>
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

export default UpdateRoleModal