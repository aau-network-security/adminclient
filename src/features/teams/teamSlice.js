import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    status: "",
    teams: [],
    error: "",
    challengesSolving: {},
    statusCode: "",
}
export const fetchEventTeams = createAsyncThunk('team/fetchEventTeams', async (req, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        var endpoint = 'teams/' + req.eventTag
        const response = await apiClient.get(endpoint)
        if (typeof response.data.teams === "undefined") {
            response.data.teams = []
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

export const forceTeamSolve = createAsyncThunk('team/forceTeamSolve', async (challenge, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.post('teams/solve', challenge)
        
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

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setSolvedStatus: (state, action) => {
            console.log(action.payload)
            state.teams[action.payload.team].labInfo.exercises[action.payload.parentIdx].childExercises[action.payload.childIdx].solved = action.payload
        }
    },
    extraReducers: (builder) => {
        // FetchEventTeams
        builder.addCase(fetchEventTeams.pending, (state) => {
            state.status = "fetching"
        })
        builder.addCase(fetchEventTeams.fulfilled, (state, action) => {
            state.status = "idle"
            state.teams = action.payload.teams
            state.error = ''
        })
        builder.addCase(fetchEventTeams.rejected, (state, action) => {
            state.status = "idle"
            state.teams = []
            state.error = action.payload.apiError.status
            state.statusCode = action.payload.apiStatusCode
        })
        // ForceTeamSolve
        builder.addCase(forceTeamSolve.pending, (state, action) => {
            state.status = "solving"
            state.challengesSolving[action.meta.arg.exerciseTag] = 'solving'
        })
        builder.addCase(forceTeamSolve.fulfilled, (state, action) => {
            state.status = "idle"
            state.error = ''
            delete state.challengesSolving[action.meta.arg.exerciseTag]
        })
        builder.addCase(forceTeamSolve.rejected, (state, action) => {
            state.status = "idle"
            state.error = action.payload.apiError.status
            state.statusCode = action.payload.apiStatusCode
            delete state.challengesSolving[action.meta.arg.exerciseTag]
        })
    }
})

export default teamSlice.reducer
export const { setSolvedStatus } = teamSlice.actions