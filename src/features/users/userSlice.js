import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"
import { getUsernameFromToken } from "../../AppRouter";

const initialState = {
    status: 'idle',
    users: [],
    loggedInUser: {},
    loggedIn: false,
    statusCode: 200,
    error: ''
}

export const addUser = createAsyncThunk('user/addUser', async (user, { rejectWithValue, getState }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const { org } = getState()
        const response = await apiClient.post('users', user)
        let userResp = {
            user: {
                Username: user.username,
                FullName: user.fullName,
                Email: user.email,
                Role: "role::" + user.role,
                Organization: user.organization,
                LabQuota: user.labQuota
            }
        }
        if (org.selectedOrg !== null) {
            if (org.selectedOrg.Name !== user.organization) {
                return null
            }
        }
        return userResp
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})

// Delete user api request
export const deleteUser = createAsyncThunk('user/deleteUser', async (user, { rejectWithValue }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.delete('users/' + user.name)
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

// Get users api request
export const fetchUsers = createAsyncThunk('user/fetchUsers', async(orgName, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.get('users?organization=' + orgName)
        if (typeof response.data.users === "undefined") {
            response.data.agents = []
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

// Get users api request
export const fetchSelf = createAsyncThunk('user/fetchSelf', async(obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const user = getUsernameFromToken(localStorage.getItem('token'))
        const response = await apiClient.get('users/' + user)
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



// Update user
export const updateUser = createAsyncThunk('user/updateUser', async (user, { rejectWithValue, getState }) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const { org } = getState()
        const response = await apiClient.put('users', user)
        return response
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})

// Login api request
export const loginUser = createAsyncThunk('user/loginUser', async (reqData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('users/login', reqData)
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

// Token validation api request
// export const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', () => {
//     let token = localStorage.getItem('token')
//     // Thunk will return error if it cannot pass the value as json
//     let tokenPayload = token.split('.')[1]
//     const decoded = JSON.parse(Buffer.from(tokenPayload, 'base64'));
//     let endpoint = "users/" + decoded.sub
    
//     apiClient.defaults.headers.Authorization = localStorage.getItem('token')
//     return apiClient.get(endpoint)
//     .then(
//         (response) => response.data
//     )
// })

// export const validateToken = createAsyncThunk('user/validateToken', 
//     async (arg, { rejectWithValue }) => {
//     try {
//         const { data } = await apiClient.get('users/token/validate')
//         return data
//     }
//     catch (error) {
//         if (error.response && error.response.data.message) {
//             return rejectWithValue(error.response.data.message)
//         } else {
//             return rejectWithValue(error.message)
//         }
//     }
// })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Logs out a user
        logoutUser: (state) => {
            state.loggedIn = false
            state.loggedInUser = null
            localStorage.removeItem('token');
        },
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload.userinfo
            state.loggedIn = true
        }
    },
    extraReducers: (builder) => {
        // Delete user
        builder.addCase(addUser.pending, (state) => {
            state.status = 'adding'
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.status = ''
            if (action.payload !== null) {
                state.users.push(action.payload)
            }            
            state.error = ''
        })
        builder.addCase(addUser.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })

        // fetchUsers
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'fetching'
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = ''
            state.users = action.payload.users
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.status = ''
            state.users = []
            state.error = action.payload
        })

        // fetchSelf
        builder.addCase(fetchSelf.pending, (state) => {
            state.status = 'fetchSelf'
        })
        builder.addCase(fetchSelf.fulfilled, (state, action) => {
            state.status = ''
            state.loggedInUser = action.payload.userinfo
            state.loggedIn = true
            state.error = ''
        })
        builder.addCase(fetchSelf.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })

        // Delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.status = 'deleting'
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.status = ''
            state.users.splice(action.meta.arg.id, 1)
            state.selectedOrg = null
            state.error = ''
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })

        // Update user
        builder.addCase(updateUser.pending, (state) => {
            state.status = 'updating'
        })
        builder.addCase(updateUser.fulfilled, (state) => {
            state.status = ''
            state.error = ''
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'logging in'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = ''
            state.loggedIn = true
            state.loggedInUser = action.payload.userinfo
            localStorage.setItem('token', action.payload.token)
            state.error = ''
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = ''
            state.loggedIn = false
            state.error = action.payload
        })

        // validateToken
        // builder.addCase(getLoggedInUser.pending, (state) => {
        //     state.loading = true
        // })
        // builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.loggedIn = true
        //     state.loggedInUser = action.payload.user
        //     state.error = ''
        // })
        // builder.addCase(getLoggedInUser.rejected, (state, action) => {
        //     state.loading = false
        //     state.loggedIn = false
        //     localStorage.removeItem('token')
        //     state.error = ''
        // })

    }
})

export default userSlice.reducer
export const { logoutUser, setLoggedInUser } = userSlice.actions

