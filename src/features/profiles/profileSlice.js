import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"



const initialState = {
    fetchingProfiles: false,
    profiles: [{name:"Test Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum porta ipsum, tempor pellentesque urna. Donec pretium ipsum sem, et vestibulum eros pulvinar non. Sed mollis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
    exercises:{},tag:"beginner",secret:true},
    
    {name:"Test Name2",
    description: "The Starters category holds all the exercises that are great for beginners to take on. When holding an event for a beginner crowd, it is always a good idea to have at least one of these exercises present in the CTF.lis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
    exercises:{}, tag:"beginner2",secret:false} ],
    selectedProfile: {name:"Test Name2",
    description: "The Starters category holds all the exercises that are great for beginners to take on. When holding an event for a beginner crowd, it is always a good idea to have at least one of these exercises present in the CTF.e varius dolor in tellus egestas, id interdum erat lobortis",
    exercises:{}, tag:"beginner2", secret:false},
    error: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        selectProfile: (state, action) => {
            state.selectedProfile = action.payload;
            // console.log(state.selectedProfile)
        },
        setProfileName: (state, action) => {
            state.selectedProfile.name = action.payload;
        }
    },
})


export default profileSlice.reducer
export const { selectProfile, setProfileName } = profileSlice.actions