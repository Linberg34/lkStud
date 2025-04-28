
import httpClient from './http-client'
import {
    Profile as ProfileDTO,
    StudentProfile as StudentProfileDTO,
    EmployeeProfile as EmployeeProfileDTO,
    UpdateAvatarRequest
} from '../models/profile'

const baseUrl = '/Profile'

export async function getProfile(): Promise<ProfileDTO> {
    const response = await httpClient.get<ProfileDTO>(baseUrl)
    return response.data
}

export async function getStudentProfile(): Promise<StudentProfileDTO> {
    const response = await httpClient.get<StudentProfileDTO>(`${baseUrl}/student`)
    return response.data
}

export async function getEmployeeProfile(): Promise<EmployeeProfileDTO> {
    const response = await httpClient.get<EmployeeProfileDTO>(`${baseUrl}/employee`)
    return response.data
}

export async function updateAvatar(request: UpdateAvatarRequest): Promise<void> {
    await httpClient.put(`${baseUrl}/avatar`, request)
}
