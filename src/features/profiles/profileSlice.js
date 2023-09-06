import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    fetchingProfiles: false,
    profiles: [],
    selectedProfile: {},
    error: ''
}




export default profileSlice.reducer
export const { selectProfile } = profileSlice.actions