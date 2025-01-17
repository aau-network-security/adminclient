import { Alert, AlertDescription, AlertIcon, Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Spacer, Spinner, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-router-dom'
import { addUser } from '../../features/users/userSlice'
import { defaultTheme } from '../..'

function NewUserModal({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.org.status)
    const selectedOrg = useSelector((state) => state.org.selectedOrg)
    const loggedInUser = useSelector((state) => state.user.loggedInUser)

    const [addUserError, setAddUserError] = useState('')
    const [reqData, setReqData] = useState ({
        username: "",
        password: "",
        fullName: "",
        organization: selectedOrg === null ? "" : "",
        email: "",
        role: "",
        labQuota: 0
    })

    const [unlimitedQuota, setUnlimitedQuota] = useState(false)
    useEffect(() => {
        if (unlimitedQuota) {
            setReqData({...reqData, labQuota: null})
        } else {
            setReqData({...reqData, labQuota: 0})
        }
    }, [unlimitedQuota])

    useEffect(() =>{
        if (selectedOrg !== null) {
            setReqData({...reqData, organization: selectedOrg.Name})
        }        
    },[selectedOrg])
    
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await dispatch(addUser(reqData)).unwrap()
            // console.log("user add response: ", response)
            setAddUserError('')
            closeModal()
        }
        catch (err) {
            console.log(err)
            setAddUserError(err.apiError.status)
        }
        
    }
    const changeHandler = (e) => {
        if (typeof e.target !== "undefined") {
            if (e.target.name === 'username'){
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            } else if (e.target.name === 'password') {
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            } else if (e.target.name === 'fullName') {
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            } else if (e.target.name === 'organization') {
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            } else if (e.target.name === 'email') {
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            }
        } else {
            setReqData({...reqData, labQuota: Number(e)})
        }
    }
    const closeModal = () => {
        setAddUserError('')
        onClose()
    }
    return (
    <>
        <Modal onClose={closeModal} isOpen={isOpen} scrollBehavior='inside' size="xl">
        <ModalOverlay />
        <ModalContent minH="450px">
            {status === 'adding'
            ?
            <Center height="100%" width="100%" position="relative">
                <Spinner color="aau.primary" size="" height="100px" width="100px" thickness="5px"/>
            </Center>
            :
            <>
                
                <form onSubmit={submitForm}>
                    <ModalHeader>Add user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >   
                            {(addUserError !== '')
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>{addUserError}</AlertDescription>
                                </Alert>
                            // : (addOrgError !== '' && (addOrgError.includes("Invalid Authentication Key")))
                            // ?
                            //     <Alert status='error'>
                            //         <AlertIcon />
                            //         <AlertDescription>Error adding agent: Invalid authentication key</AlertDescription>
                            //     </Alert>
                            // : (addOrgError !== '' && (addOrgError.includes("signature is invalid")))
                            // ?
                            //     <Alert status='error'>
                            //         <AlertIcon />
                            //         <AlertDescription>Error adding agent: Invalid signature key</AlertDescription>
                            //     </Alert>
                            // : (addOrgError !== '' && (addOrgError.includes("authentication handshake failed")))
                            // ?
                            //     <Alert status='error'>
                            //         <AlertIcon />
                            //         <AlertDescription>Error adding agent: Agent does not support TLS</AlertDescription>
                            //     </Alert>
                            // : (addOrgError !== '' && (addOrgError.includes("connection refused")))
                            // ?
                            //     <Alert status='error'>
                            //         <AlertIcon />
                            //         <AlertDescription>Error adding agent: Connection refused</AlertDescription>
                            //     </Alert>
                            :
                                null
                            }
                                
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="username" placeholder="Username" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="password" name="password" placeholder="Password" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                <FormLabel>Full name</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="fullName" placeholder="Full name" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="email" name="email" placeholder="Email" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                {(typeof loggedInUser.user !== 'undefined')
                                &&
                                <>
                                    {loggedInUser.user.Role === 'role::superadmin'
                                    &&  
                                    <>
                                        <FormControl>
                                        <FormLabel>Organization</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                            />
                                            <Input type="text" name="organization" value={reqData.organization} placeholder="Organization" onChange={changeHandler} />
                                            </InputGroup>
                                        </FormControl>
                                    </>
                                    }
                                </>
                                    
                                }
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Select value={reqData.role} placeholder='Select role' onChange={(e) => setReqData({...reqData, role: e.target.value})}>
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
                                {reqData.role === 'npuser' && (
                                    <Flex>
                                        <FormControl>
                                            <FormLabel display="flex">
                                                <Text>
                                                    Lab quota
                                                </Text>
                                                <Spacer />
                                                <Checkbox value={unlimitedQuota} onChange={(e) => setUnlimitedQuota(e.target.checked)} defaultChecked={unlimitedQuota}>
                                                    Unlimited labs
                                                </Checkbox>
                                            </FormLabel>                                        
                                            <NumberInput isDisabled={unlimitedQuota} value={reqData.labQuota != null ? reqData.labQuota : ''} onChange={changeHandler}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </Flex> 
                                )}
                            </Stack>
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={closeModal}>Close</Button>
                    <Spacer />
                    <Button 
                        type='submit' 
                        colorScheme='aau.button'
                        variant='solid'
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

export default NewUserModal