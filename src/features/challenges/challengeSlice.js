import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"


const initialState = {
    selector: "category",
    selectedCategory: {},
    searchParam: "",
    error: '',
    selectedChallenges:[]
}

const challengeSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        selectCategoryShow: (state) => {
            state.selector = "category" 
           
        },
        selectProfileShow: (state) => {
            state.selector ="profiles" 
        },
        setSearchParam: (state, action) => {
            state.searchParam = action.payload
        }
    }
})
export default challengeSlice.reducer
export const { selectProfileShow, selectCategoryShow, setSearchParam} = challengeSlice.actions
