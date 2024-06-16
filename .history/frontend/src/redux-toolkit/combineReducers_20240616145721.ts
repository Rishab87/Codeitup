<<<<<<< HEAD
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import questionReducer from './slices/questions'

export const rootReducer = combineReducers({
    auth: authReducer,
    questions: questionReducer,
})
=======
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

export const rootReducer = combineReducers({
    auth: authReducer,
})
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
