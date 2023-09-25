import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    fetchingProfiles: false,
    profiles: [{name:"Test Name",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum porta ipsum, tempor pellentesque urna. Donec pretium ipsum sem, et vestibulum eros pulvinar non. Sed mollis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
    exercises:{}},{name:"Test Name2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum porta ipsum, tempor pellentesque urna. Donec pretium ipsum sem, et vestibulum eros pulvinar non. Sed mollis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
    exercises:{}} ],
   
    selectedProfile: {},
    error: ''
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        selectProfile: (state, action) => {
            state.selectedProfile = action.payload
        }
    },
})


export default profileSlice.reducer
export const { selectProfile } = profileSlice.actions