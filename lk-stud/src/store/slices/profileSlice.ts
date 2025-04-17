import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import * as profileAPI from '../../app/api/services/profile-service'

import {
    Profile as ProfileDTO,
    StudentProfile as StudentProfileDTO,
    EmployeeProfile as EmployeeProfileDTO,
} from '../../app/api/models/profile/index.ts'

interface ProfileState {
    profile: ProfileDTO | null
    student: StudentProfileDTO | null
    employee: EmployeeProfileDTO | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProfileState = {
    profile: null,
    student: null,
    employee: null,
    status: 'idle',
    error: null,
}

export const fetchProfile = createAsyncThunk<ProfileDTO>(
    'profile/fetchProfile',
    async () => {
        return await profileAPI.getProfile()
    }
)

export const fetchStudentProfile = createAsyncThunk<StudentProfileDTO>(
    'profile/fetchStudent',
    async () => {
        return  await profileAPI.getStudentProfile()
    }
)

export const fetchEmployeeProfile = createAsyncThunk<EmployeeProfileDTO>(
    'profile/fetchEmployee',
    async () => {
        return await profileAPI.getEmployeeProfile()
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null
            state.student = null
            state.employee = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfile.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<ProfileDTO>) => {
                state.status = 'succeeded'
                state.profile = action.payload
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Не удалось загрузить профиль'
            })

            .addCase(fetchStudentProfile.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action: PayloadAction<StudentProfileDTO>) => {
                state.status = 'succeeded'
                state.student = action.payload
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Не удалось загрузить данные студента'
            })

            .addCase(fetchEmployeeProfile.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchEmployeeProfile.fulfilled, (state, action: PayloadAction<EmployeeProfileDTO>) => {
                state.status = 'succeeded'
                state.employee = action.payload
            })
            .addCase(fetchEmployeeProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Не удалось загрузить данные сотрудника'
            })
    },
})

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
