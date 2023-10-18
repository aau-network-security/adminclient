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
    fetchingSelectedExercises: false,
    profiles: [ ],
    selectedProfile: {},
    selectedExercises:[],
    error: '',
    status:""
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

export const updateProfile = createAsyncThunk('exercises/profiles', async (reqData, { rejectWithValue }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        var profile = reqData.profile
        const response = await apiClient.put('exercises/profiles/'+reqData.id, profile)
        
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
        const response = await apiClient.delete('exercises/profiles/'+reqData)
        
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

export const fetchSelectedExercises = createAsyncThunk('exercises/getbytag', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.post('exercises/getbytags', obj)
        if (typeof response.data.exercises === "undefined") {
            response.data.exercises = []
        }
        // console.log("fetchSelectedExercises: ",response.data)
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
            // console.log("selected profile: ",state.selectedProfile)
        },
        setProfileName: (state, action) => {
            state.selectedProfile.name = action.payload;
        },
        clearSelectedProfile: (state) => {
            state.selectedProfile = {}
            state.selectedExercises = []
            // console.log("clearSelectedProfileCalled")
        },
        clearSelectedExercises: (state) => {
            state.selectedExercises = []
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
        // Update profile
        builder.addCase(updateProfile.pending, (state, action) => {
            state.status = 'updatingProfile'
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.status = ''
            state.error = ''
        })
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })
        // Fetch profiles
        builder.addCase(fetchProfiles.pending, (state) => {
            state.fetchingProfiles = true
            // console.log("fetching profiles")
        })
        builder.addCase(fetchProfiles.fulfilled, (state, action) => {
            state.fetchingProfiles = false
            state.profiles = action.payload.profiles
            // console.log("profiles", state.profiles)
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
            // console.log("deleting profile")
        })
        builder.addCase(deleteProfile.fulfilled, (state, action) => {
            state.status = ''
            state.error = ''
        })
        builder.addCase(deleteProfile.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })
        // Fetch exercises for the selected profile
        builder.addCase(fetchSelectedExercises.pending, (state) => {
            state.fetchingSelectedExercises = true
        })
        builder.addCase(fetchSelectedExercises.fulfilled, (state, action) => {
            state.fetchingSelectedExercises = false
            state.selectedExercises = action.payload.exercises
            // console.log("selected exercises", state.profiles.)
            state.error = ''
        })
        builder.addCase(fetchSelectedExercises.rejected, (state, action) => {
            state.fetchingSelectedExercises = false
            state.selectedExercises = []
            state.error = action.payload.data.status
            state.statusCode = action.payload.status
        })
    }

    
})


export default profileSlice.reducer
export const { selectProfile, setProfileName, clearSelectedProfile,clearSelectedExercises } = profileSlice.actions