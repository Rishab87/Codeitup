<<<<<<< HEAD
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
=======
'use client'

import { createSlice } from "@reduxjs/toolkit"

type authState = {
    token: string | null;
    user: {} | null;
}

const initialState:authState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setToken(state , action){
            state.token = action.payload;
            localStorage.setItem('token' , action.payload);
        },
        setUser(state , action){
            state.user = action.payload;
        },
        logout(state , action){
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        }
    }
})

export const {setToken , setUser} = authSlice.actions;
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
export default authSlice.reducer;