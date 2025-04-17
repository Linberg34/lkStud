import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { login as apiLogin } from '../../app/api/services/auth-service'
import { LoginRequest, LoginResult } from '../../app/api/models/Auth'

interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    status: 'idle',
    error: null,
}

export const login = createAsyncThunk<
    LoginResult,     
    LoginRequest,    
    { rejectValue: string }
>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const result = await apiLogin(credentials)
            return result
        } catch (err) {
            return rejectWithValue((err as Error).message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.accessToken = null
            state.refreshToken = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResult>) => {
                state.status = 'succeeded'
                state.accessToken = action.payload.accessToken
                state.refreshToken = action.payload.refreshToken
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload ?? action.error.message ?? 'Ошибка входа'
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
