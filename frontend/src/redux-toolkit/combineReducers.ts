import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import questionReducer from './slices/questions'

export const rootReducer = combineReducers({
    auth: authReducer,
    questions: questionReducer,
})
