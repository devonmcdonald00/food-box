import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        admin: false,
        signedIn: false,
    },
    reducers: {
        set_admin: (state, action) => {
            state.admin = action.payload
        },
        set_username: (state, action) => {
            state.username = action.payload;
        },
        set_signedIn: (state, action) => {
            state.signedIn = action.payload
        }
    }
})

export const { set_admin, set_username, set_signedIn } = userSlice.actions

export default userSlice.reducer