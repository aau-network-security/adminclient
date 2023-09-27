import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, InputGroup, Input, EditableInput, EditablePreview, Editable} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { selectProfile, setProfileName } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';




function ProfileNameCard() {

    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );
    const dispatch = useDispatch();
    
    const [isEditing, setIsEditing] = useState(false);

    const handleToggleEdit = () => {
        
        setIsEditing(!isEditing);
        console.log(isEditing)
    }
    

    const EditableInput = () => {       
        
        const [fieldValue, setFieldValue] = useState(selectedProfile.name);
        
        const onChangeInput = (event) => { 
            event.preventDefault()
            setFieldValue(event.target.value);
        }

        const handleSubmit = (event) => {
            event.preventDefault()
            dispatch(setProfileName(fieldValue))
            setIsEditing(!isEditing)
        }
        return (
            <>
            <form
            onSubmit={handleSubmit}
            style={{ height: "100%", width: "100%"}}
            >

            <HStack h="100%" w="100%">            
            <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px">
            <FormControl>

            <Text fontSize="30px">
                <input
                value={fieldValue}
                type="text"
                onChange={(event) => onChangeInput(event)}
                onSubmit={(event) => handleSubmit(event)}
                />
            </Text>
            </FormControl>
            </Flex>
            
            <Flex flexDir="column" h="100%" w="10%" bg="#211a52" borderRadius="0px 10px 10px 0px" >
                <Center w="100%" h="100%">
                    <button onClick={(event) => handleSubmit(event)}>
                    <Icon
                        as={MdSave}
                        fontSize="30px"
                        color="white"
                        />
                    </button>
                </Center>
            </Flex>
            </HStack>
            </form>
            </>
        )
    }
    const ViewProfileName = () => { 
        return (
            <>
            <HStack h="100%" w="100%">
               <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 30px">
                    <Text fontSize="30px">{selectedProfile.name}</Text>
               </Flex>
               <Spacer />
               <Flex flexDir="column" h="100%" w="10%" bg="#211a52" borderRadius="0px 10px 10px 0px" onClick={handleToggleEdit}>
                <Center w="100%" h="100%">
                    <button>
                        <Icon
                        as={FiEdit3}
                        fontSize="30px"
                        color="white"
                        />
                    </button>
                </Center>
               </Flex>
               </HStack>
            </>
        )
    
    }


    return  (
    <>
        <Box
            className="container"
            padding="0"
            borderRadius="10px"
            > 
        
        { isEditing ?(
         <EditableInput/>
        ):
        (<ViewProfileName/>)
        }
        

        

        
        </Box>

    
    </>
  
  )
}

export default ProfileNameCard