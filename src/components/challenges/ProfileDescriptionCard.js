import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, FormLabel, InputGroup, Input, useEditableControls, IconButton, Editable, EditablePreview, EditableInput, EditableTextarea, useEditableState, useToast, VStack} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { fetchProfiles, selectProfile, updateProfile } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';
import { defaultTheme } from "../..";





function ProfileDescriptionCard() {
    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );

    var initialExerciseTags = [] 
    const toast = useToast();
    const toastIdRef = React.useRef();
    useEffect(() => {
        if (profiles.length > 0) {
            dispatch(selectProfile(profiles[0]));
        }
    }, [profiles]);

    // console.log("profiledescription: ", selectedProfile)
    
    const [reqDataState, setReqDataState] = useState({
        name: "",
        description:"",
        public:"",
        exerciseTags: [],
    });

    const [fieldValue, setFieldValue] = useState(selectedProfile.description);
    useEffect(() => {
       setFieldValue(selectedProfile.description)
       setReqDataState(reqDataState =>({
        ...reqDataState,
        ["description"]: selectedProfile.description
    }))
    }, [selectedProfile]);

 

    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getEditButtonProps
        } = useEditableControls()
        
        return isEditing ?(
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            <Center w="100%" h="100%">
            <Button     {...getSubmitButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "aau.hover" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        h="100%"
                        
                        // onClick={handleSubmit}
                        
                    >
                    <Icon
                        as={MdSave}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
            </Center>
            
            </Flex>
        ) : (
            <Flex flexDir="column" h="100%" w="10%" bg="aau.primary"  borderRadius="0px 10px 10px 0px">
            {/* <Center w="100%" h="100%"> */}
        <Button         {...getEditButtonProps()}
                        backgroundColor="aau.primary"
                        _hover={{ backgroundColor: "aau.hover" }}
                        color="white"
                        borderRadius="0px 10px 10px 0px"
                        
                        h="100%"
                       
                        
                    >
                    <Icon
                        as={FiEdit3}
                        fontSize="30px"
                        color="white"
                        />
            </Button>
        {/* </Center> */}
            
            </Flex>
        )
    }
    

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setReqDataState(reqDataState =>({
                ...reqDataState,
                ["name"]: selectedProfile.name
            }))
        setReqDataState(reqDataState =>({
            ...reqDataState,
            ["description"]: fieldValue
        }))
        
        if (Object.keys(selectedProfile.exercises).length > 0){
            initialExerciseTags = selectedProfile.exercises.map(exercise => exercise.Tag)
            setReqDataState(reqDataState => ({
                ...reqDataState,
                exerciseTags: initialExerciseTags
                
            }));
        }

        var reqData = {
            name: reqDataState.name,
            description: fieldValue,
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
                title: "Profile description successfully updated",
                description: "The profile description was successfully updated",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            dispatch(fetchProfiles())
            // navigate("/challenges")
        } catch (err) {
            console.log("got error updating profile description", err);
            toastIdRef.current = toast({
                title: "Updating profile description",
                description: err.apiError.status,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }



        // console.log("Submitted Value:", fieldValue)
    }
    const handleFieldChange = (newValue) => {
        setFieldValue(newValue)
        console.log("fieldchange",newValue)
        // if (e.target.name === "profileDescription") {
        //     console.log("description", e.target.value.trim())
        //     setReqDataState({
        //         ...reqDataState,
        //         ["description"]: e.target.value.trim(),
        //     });
        // }
    }


    return  (
    <> 
    <VStack alignItems='left'>
    <Text fontSize={"23px"}>Description</Text>
    <Editable
        width="100%"
        bg={"#f7fafc"}
        height="inherit"
        borderRadius="10px"
        borderColor="black"
        // focusBorderColor="#c8dcea"
        // defaultValue={selectedProfile.description}
        value={fieldValue}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        name="profileDescription"
        isPreviewFocusable={false}
        // className='container'
        padding="0"
        
        >      
       
        <HStack h="100%" w="100%">
        
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 5px">
            <EditablePreview />
            <EditableTextarea style={{ height: "130px", padding:"5px"}}/>
            {/* <Text fontSize="15px" > {selectedProfile.description}</Text> */}
        </Flex>
        {/* <Spacer /> */}
        
        <EditableControls style={{ height: "130px" }}/>
   
        </HStack>
        
        </Editable>
        </VStack>
        
    </>
  
  )
}

export default ProfileDescriptionCard