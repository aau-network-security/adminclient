import { Box, Icon, Text, Flex, Spacer, Button,HStack, Center, FormControl, InputGroup, Input, EditableInput, EditablePreview, Editable, useToast, EditableTextarea, useEditableControls} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { FiEdit3 } from 'react-icons/fi'
import { clearSelectedProfile, fetchProfiles, selectProfile, setProfileName, updateProfile } from "../../features/profiles/profileSlice";
import { useDispatch, useSelector } from 'react-redux';




function ProfileNameCard() {

    const dispatch = useDispatch();
    const profiles = useSelector((state) => state.profile.profiles);
    const selectedProfile = useSelector(
        (state) => state.profile.selectedProfile
    );


    var initialExerciseTags = [] 
    const toast = useToast();
    const toastIdRef = React.useRef();
   
    // console.log("profiledescription: ", selectedProfile)
    
    const [reqDataState, setReqDataState] = useState({
        name: "",
        description:"",
        public:"",
        exerciseTags: [],
    });

    const [fieldValue, setFieldValue] = useState("");
    useEffect(() => {
       setFieldValue(selectedProfile.name)
       setReqDataState(reqDataState =>({
        ...reqDataState,
        ["name"]: selectedProfile.name
    }))
    }, [selectedProfile]);


    useEffect(() => {
        if (selectedProfile.exercises != null){
            if (Object.keys(selectedProfile.exercises).length > 0){
                initialExerciseTags = selectedProfile.exercises.map(exercise => exercise.Tag)
                setReqDataState(reqDataState => ({
                    ...reqDataState,
                    exerciseTags: initialExerciseTags
                    
                }));
                console.log("tags for editing profile",initialExerciseTags)
            }
            setReqDataState(reqDataState =>({
                ...reqDataState,
                ["id"]: selectedProfile.id
            }))
            setReqDataState(reqDataState =>({
                ...reqDataState,
                ["name"]: selectedProfile.name
            }))
            setReqDataState(reqDataState =>({
                ...reqDataState,
                ["description"]: selectedProfile.description
            }))
            setReqDataState(reqDataState =>({
                ...reqDataState,
                ["public"]: selectedProfile.public
            }))
        }
    }, [profiles,selectedProfile]);

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
                ["name"]: fieldValue
            }))
        setReqDataState(reqDataState =>({
            ...reqDataState,
            ["description"]: selectedProfile.description
        }))
        
        if (Object.keys(selectedProfile.exercises).length > 0){
            initialExerciseTags = selectedProfile.exercises.map(exercise => exercise.Tag)
            setReqDataState(reqDataState => ({
                ...reqDataState,
                exerciseTags: initialExerciseTags
                
            }));
        }

   
        var reqData = {
            id: selectedProfile.id,
            profile: {
                id:selectedProfile.id,
                name: fieldValue,
                description: reqDataState.description,
                exerciseTags: reqDataState.exerciseTags,
                public:selectedProfile.public,
            }            
        };
        
        console.log("profilename",reqData)

        if (reqData.profile.name.length === 0) {
            setFieldValue(selectedProfile.name)
            toastIdRef.current = toast({
                title: "Profile name cant be empty",
                description: "Write a name in order to save.",
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
   
    <Editable
        height="inherit"
        fontSize={"30px"}
        // defaultValue={selectedProfile.description}
        value={fieldValue}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
        name="name"
        isPreviewFocusable={false}
        // className='container'
        borderRadius="10px"
        borderColor="black"
        bg={"#f7fafc"}
        padding="0"
        resize={"none"}
        >      
        
        <HStack h="100%" w="100%">
        
        <Flex flexDir="column" h="100%" w="90%" padding="5px 0px 5px 5px">
            <EditablePreview />
            <EditableTextarea style={{ height: "50px" , padding:"5px"} }/>
            {/* <Text fontSize="15px" > {selectedProfile.description}</Text> */}
        </Flex>
        {/* <Spacer /> */}
        
        <EditableControls style={{ height: "50px" }}/>
   
        </HStack>
        
        </Editable>
        
    </>
  
  )
}

export default ProfileNameCard