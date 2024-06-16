'use client'

import { createSlice } from "@reduxjs/toolkit"

type authState = {
    token: string | null;
    user: any; //change it
}

const initialState:authState = {
    token: null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setToken(state , action){
            state.token = action.payload;
        },
        setUser(state , action){
            state.user = action.payload;
        },
    }
})

export const {setToken , setUser} = authSlice.actions;
export default authSlice.reducer;