import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

function ClearChallengesDialog(props) {

    const onClickDelete = () => {
        props.deleteProfile()
        props.onClose()
    }

  return (
    <>  
        <AlertDialog
          isOpen={props.isOpen}
          leastDestructiveRef={props.cancelRef}
          onClose={props.onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Clear selected challenges
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to clear the selected challenges?<br></br>
                This means that you will have to start over with selecting challenges. 
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={props.cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button colorScheme='aau.buttonRed' onClick={onClickDelete} ml={3}>
                  Clear
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
  )
}

export default ClearChallengesDialog