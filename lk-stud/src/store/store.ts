import { configureStore } from "@reduxjs/toolkit";
import languageReducer from './slices/languageSlice'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import usersReducer from './slices/usersSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        auth: authReducer,
        profile: profileReducer,
        users: usersReducer
    }
})


export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch