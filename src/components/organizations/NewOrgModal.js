import { Alert, AlertDescription, AlertIcon, Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Spinner, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { useDispatch, useSelector } from 'react-redux'
import { addOrg } from '../../features/organizations/organizationSlice'
import { defaultTheme } from '../..'

function NewOrgModal({ isOpen, onClose }) {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.org.status)
    const [addOrgError, setAddOrgError] = useState('')
    const [reqData, setReqData] = useState ({
        orgName: '',
        labQuota: 0,
        orgOwner: {
            username: '',
            password: '',
            fullName: '',
            email: ''
        }
        
    })
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await dispatch(addOrg(reqData)).unwrap()
            setAddOrgError('')
            closeModal()
        }
        catch (err) {
            console.log(err)
            setAddOrgError(err.apiError.status)
        }
        
    }
    
    const [unlimitedQuota, setUnlimitedQuota] = useState(false)
    useEffect(() => {
        if (unlimitedQuota) {
            setReqData({...reqData, labQuota: null})
        } else {
            setReqData({...reqData, labQuota: 0})
        }
    }, [unlimitedQuota])
    const changeHandler = (e) => {
        if (typeof e.target !== "undefined") {
            if (e.target.name === 'orgName'){
                setReqData({...reqData, [e.target.name]: e.target.value.trim()})
            } else if (e.target.name === 'username') {
                let orgOwner = reqData.orgOwner
                orgOwner.username = e.target.value.trim()
                setReqData({...reqData, orgOwner})
            } else if (e.target.name === 'password') {
                let orgOwner = reqData.orgOwner
                orgOwner.password = e.target.value.trim()
                setReqData({...reqData, orgOwner})
            } else if (e.target.name === 'fullName') {
                let orgOwner = reqData.orgOwner
                orgOwner.fullName = e.target.value.trim()
                setReqData({...reqData, orgOwner})
            } else if (e.target.name === 'email') {
                let orgOwner = reqData.orgOwner
                orgOwner.email = e.target.value.trim()
                setReqData({...reqData, orgOwner})
            }
        } else {
            setReqData({...reqData, labQuota: Number(e)})
        }
    }
    const closeModal = () => {
        setAddOrgError('')
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
                    <ModalHeader>Add organization</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                            <Stack
                            spacing={4}
                            p="1rem"
                            >   
                            {(addOrgError !== '')
                            ?
                                <Alert status='error'>
                                    <AlertIcon />
                                    <AlertDescription>{addOrgError}</AlertDescription>
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
                                    <FormLabel>Organization name</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="orgName" placeholder="Organization name" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <Flex>
                                    <FormControl>
                                        <FormLabel display="flex">
                                            <Text>
                                                Lab quota
                                            </Text>
                                            <Spacer />
                                            <Checkbox value={unlimitedQuota} onChange={(e) => setUnlimitedQuota(e.target.checked)}>
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
                                <FormControl >
                                    <Center marginTop="20px" fontWeight="bold">
                                        <h1>Organization owner info <br/> </h1>
                                    </Center>
                                    <Center>
                                        <h2>(A new user will be created under the new organization)</h2>
                                    </Center>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Username</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="username" placeholder="Owner's new username" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="password" name="password" placeholder="Owner password" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Full name</FormLabel>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                    />
                                    <Input type="text" name="fullName" placeholder="Owner's full name" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                        />
                                    <Input type="email" name="email" placeholder="Owner's email" onChange={changeHandler} />
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                    
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={closeModal}>Close</Button>
                    <Spacer />
                    <Button 
                        type='submit' 
                        colorScheme='aau.button'
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

export default NewOrgModal