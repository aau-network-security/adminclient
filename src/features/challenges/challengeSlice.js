import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"


const initialState = {
    selector: "category",
    selectedCategory: {},
    error: ''
}

const challengeSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        selectCategoryShow: (state) => {
            state.selector = "category"
            
           
        },
        selectProfileShow: (state) => {
            state.selector ="profiles" 
        }
    }
})
export default challengeSlice.reducer
export const { selectProfileShow, selectCategoryShow} = challengeSlice.actions
