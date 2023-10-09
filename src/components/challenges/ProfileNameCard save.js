import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, InputGroup, Input, EditableInput, EditablePreview, Editable, useToast} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { fetchProfiles, selectProfile, setProfileName, updateProfile } from "../../features/profiles/profileSlice";
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
    const [fieldValue, setFieldValue] = useState(selectedProfile.name);
   
    const [reqDataState, setReqDataState] = useState({
        name: "",
        description:"",
        public:"",
        exerciseTags: [],
    });

    useEffect(() => {
        setFieldValue(selectedProfile.name)
        setReqDataState(reqDataState =>({
         ...reqDataState,
         ["name"]: selectedProfile.name
     }))
     }, [selectedProfile]);

     var initialExerciseTags = [] 
     const toast = useToast();
     const toastIdRef = React.useRef();
    const EditableInput = () => {       
        
        
        
        const onChangeInput = (newValue) => { 

           console.log("profilename FieldValue: ", fieldValue)
            setFieldValue(newValue);
        }

        const handleSubmit = async (event) => {
            event.preventDefault()
            setReqDataState(reqDataState =>({
                ...reqDataState,
                ["description"]: selectedProfile.description
            }))
        setReqDataState(reqDataState =>({
            ...reqDataState,
            ["name"]: fieldValue
        }))
        
        if (Object.keys(selectedProfile.exercises).length > 0){
            initialExerciseTags = selectedProfile.exercises.map(exercise => exercise.Tag)
            setReqDataState(reqDataState => ({
                ...reqDataState,
                exerciseTags: initialExerciseTags
                
            }));
        }

        var reqData = {
            name: fieldValue,
            description: reqDataState.description,
            exerciseTags: reqDataState.exerciseTags,
            public:false
        };
        
        console.log("description",reqData.description)

        if (reqData.description.length === 0) {
            toastIdRef.current = toast({
                title: "Profile description cant be empty",
                description: "Write a description in order to save.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await dispatch(updateProfile(reqData)).unwrap();
            toastIdRef.current = toast({
                title: "Profile name successfully updated",
                description: "The profile name was successfully updated",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            dispatch(fetchProfiles())
            setIsEditing(!isEditing)
            // navigate("/challenges")
        } catch (err) {
            console.log("got error updating profile name", err);
            toastIdRef.current = toast({
                title: "Updating profile name",
                description: err.apiError.status,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

            // dispatch(setProfileName(fieldValue))
            
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
                name="name"
                value={fieldValue}
                type="text"
                onChange={onChangeInput}
                // onSubmit={handleSubmit}
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