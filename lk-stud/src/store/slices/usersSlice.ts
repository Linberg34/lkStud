import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
    ProfileShortDtoPagedListWithMetadata,
    Profile,
    ProfileUpdateDto,
    StudentProfile,
    EmployeeProfile
} from '../../app/api/models/profile'
import {
    getUsersList,
    getUser,
    updateUser,
    getStudent,
    getEmployee
} from '../../app/api/services/user-service'

interface UsersState {
    list: ProfileShortDtoPagedListWithMetadata | null
    listLoading: boolean
    listError: string | null

    profile: Profile | null
    profileLoading: boolean
    profileError: string | null

    studentProfile: StudentProfile | null
    studentLoading: boolean
    studentError: string | null

    employeeProfile: EmployeeProfile | null
    employeeLoading: boolean
    employeeError: string | null

    updateLoading: boolean
    updateError: string | null

    avatarUpdating: boolean
    avatarError: string | null
}

const initialState: UsersState = {
    list: null,
    listLoading: false,
    listError: null,
    profile: null,
    profileLoading: false,
    profileError: null,
    studentProfile: null,
    studentLoading: false,
    studentError: null,
    employeeProfile: null,
    employeeLoading: false,
    employeeError: null,
    updateLoading: false,
    updateError: null,
    avatarUpdating: false,
    avatarError: null
}

export const fetchUsersList = createAsyncThunk<
    ProfileShortDtoPagedListWithMetadata,
    { email?: string; name?: string; filterLastName?: string; page?: number; pageSize?: number },
    { rejectValue: string }
>('users/fetchList', async (params) => {
    const data = await getUsersList(params)
    return data
})

export const fetchUser = createAsyncThunk<
    Profile,
    string,
    { rejectValue: string }
>('users/fetchUser', async (id) => {
    const data = await getUser(id)
    return data
})

export const fetchStudentProfile = createAsyncThunk<
    StudentProfile,
    string,
    { rejectValue: string }
>('users/fetchStudentProfile', async (id) => {
    const data = await getStudent(id)
    return data
})

export const fetchEmployeeProfile = createAsyncThunk<
    EmployeeProfile,
    string,
    { rejectValue: string }
>('users/fetchEmployeeProfile', async (id) => {

    const data = await getEmployee(id)
    return data

})

export const updateUserProfile = createAsyncThunk<
    void,
    { id: string; request: ProfileUpdateDto },
    { rejectValue: string }
>('users/updateUser', async ({ id, request }) => {
    await updateUser(id, request)
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null
            state.profileError = null
        },
        clearList(state) {
            state.list = null
            state.listError = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUsersList.pending, state => {
            state.listLoading = true
            state.listError = null
        })
        builder.addCase(
            fetchUsersList.fulfilled,
            (state, action: PayloadAction<ProfileShortDtoPagedListWithMetadata>) => {
                state.list = action.payload
                state.listLoading = false
            }
        )
        builder.addCase(fetchUsersList.rejected, (state, action) => {
            state.listLoading = false
            state.listError = action.payload ?? action.error.message ?? null
        })

        builder.addCase(fetchUser.pending, state => {
            state.profileLoading = true
            state.profileError = null
        })
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload
            state.profileLoading = false
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.profileLoading = false
            state.profileError = action.payload ?? action.error.message ?? null
        })

        builder.addCase(fetchStudentProfile.pending, state => {
            state.studentLoading = true
            state.studentError = null
        })
        builder.addCase(
            fetchStudentProfile.fulfilled,
            (state, action: PayloadAction<StudentProfile>) => {
                state.studentProfile = action.payload
                state.studentLoading = false
            }
        )
        builder.addCase(fetchStudentProfile.rejected, (state, action) => {
            state.studentLoading = false
            state.studentError = action.payload ?? action.error.message ?? null
        })

        builder.addCase(fetchEmployeeProfile.pending, state => {
            state.employeeLoading = true
            state.employeeError = null
        })
        builder.addCase(
            fetchEmployeeProfile.fulfilled,
            (state, action: PayloadAction<EmployeeProfile>) => {
                state.employeeProfile = action.payload
                state.employeeLoading = false
            }
        )
        builder.addCase(fetchEmployeeProfile.rejected, (state, action) => {
            state.employeeLoading = false
            state.employeeError = action.payload ?? action.error.message ?? null
        })

        builder.addCase(updateUserProfile.pending, state => {
            state.updateLoading = true
            state.updateError = null
        })
        builder.addCase(updateUserProfile.fulfilled, state => {
            state.updateLoading = false
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.updateLoading = false
            state.updateError = action.payload ?? action.error.message ?? null
        })

    }
})

export const { clearProfile, clearList } = usersSlice.actions
export default usersSlice.reducer
