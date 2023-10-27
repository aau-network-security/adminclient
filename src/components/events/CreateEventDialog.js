import React from 'react'
import SelectedChallengesCard from '../challenges/SelectedChallengesCard'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
    Box,
    useToast
  } from '@chakra-ui/react'
import CreateNewEventChallengesDialog from './CreateNewEventChallengesDialog'

function CreateEventDialog(props) {
  
  return (
    <>  
        <AlertDialog
          isOpen={props.isOpen}
          leastDestructiveRef={props.cancelRef}
          onClose={props.onClose}
          size="xl"
        >
          <AlertDialogOverlay>
            <AlertDialogContent height="500px">
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Overview
              </AlertDialogHeader>
              <AlertDialogBody>
              
                <Text> This is an overview of the selected challenges:</Text>
                <CreateNewEventChallengesDialog
                reqData={props.reqData} 
                setReqDataState={props.setReqDataState}
                />
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={props.cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
              
                <Button colorScheme='aau.buttonGreen' 
                onClick={props.createEvent} 
                ml={3}>
                  Create event
                </Button>
              
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
  )
}

export default CreateEventDialog