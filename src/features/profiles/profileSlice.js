import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const dummyProfiles= [{name:"Test Name",
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elementum porta ipsum, tempor pellentesque urna. Donec pretium ipsum sem, et vestibulum eros pulvinar non. Sed mollis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
exercises:{},tag:"beginner",public:true},

{name:"Test Name2",
description: "The Starters category holds all the exercises that are great for beginners to take on. When holding an event for a beginner crowd, it is always a good idea to have at least one of these exercises present in the CTF.lis enim a nibh eleifend pulvinar. Fusce varius dolor in tellus egestas, id interdum erat lobortis",
exercises:{}, tag:"beginner2",public:false}]

const initialState = {
    fetchingProfiles: false,
    profiles: [ ],
    selectedProfile: {},
    error: ''
}

export const createProfile = createAsyncThunk('exercises/createprofiles', async (reqData, { rejectWithValue }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.post('exercises/profiles', reqData)
        
        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})

export const fetchProfiles = createAsyncThunk('exercises/fetchprofiles', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.get('exercises/profiles')
        if (typeof response.data.profiles === "undefined") {
            response.data.profiles = []
        }
        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})

export const deleteProfile = createAsyncThunk('exercises/deleteprofile', async (reqData, { rejectWithValue }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.delete('exercises/profiles/'+reqData.name)
        
        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})



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
    extraReducers: (builder) => {
         // Add profile
         builder.addCase(createProfile.pending, (state, action) => {
            state.status = 'creatingProfile'
        })
        builder.addCase(createProfile.fulfilled, (state, action) => {
            state.status = ''
            state.error = ''
        })
        builder.addCase(createProfile.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })
        // Fetch profiles
        builder.addCase(fetchProfiles.pending, (state) => {
            state.fetchingProfiles = true
        })
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.fetchingProfiles = false
            state.profiles = action.payload.profiles
            console.log("profiles", state.profiles)
            state.error = ''
        })
        builder.addCase(fetchProfiles.rejected, (state, action) => {
            state.fetchingProfiles = false
            state.profiles = []
            state.error = action.payload.data.status
            state.statusCode = action.payload.status
        })
         // Delete profile
         builder.addCase(deleteProfile.pending, (state, action) => {
            state.status = 'deletingProfile'
        })
        builder.addCase(deleteProfile.fulfilled, (state, action) => {
            state.status = ''
            state.error = ''
        })
        builder.addCase(deleteProfile.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })
    }

    
})


export default profileSlice.reducer
export const { selectProfile, setProfileName } = profileSlice.actions