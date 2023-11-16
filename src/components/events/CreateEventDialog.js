import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Text,
    Box
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
            <AlertDialogContent height="600px">
              <AlertDialogHeader fontSize='lg' fontWeight='bold' marginLeft="15px">
                Overview
              </AlertDialogHeader>
              <AlertDialogBody>
                <Box marginLeft="15px">
                <Text> Event name: <b>{props.reqData.name}</b></Text>
                <Text> Event will be available at: https://<b>{props.reqData.tag}</b>.haaukins.com </Text>
                <Text> Number of participants: {props.reqData.maxLabs}</Text>
                <Text> This is an overview of the selected challenges:</Text>
                </Box>
                <CreateNewEventChallengesDialog
                reqData={props.reqData} 
                // setReqDataState={props.setReqDataState}
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