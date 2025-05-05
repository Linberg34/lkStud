import { EmployeeProfile, Profile, ProfileShortDtoPagedListWithMetadata, ProfileUpdateDto, StudentProfile, UpdateAvatarRequest } from "../models/profile"
import httpClient from "./http-client"

const baseUrl = "/User"


export async function getUsersList(params?:
    {
        email?: string,
        name?: string,
        filterLastName?: string,
        page?: number,
        pageSize?: number
    }
): Promise<ProfileShortDtoPagedListWithMetadata> {

    const {
        page = 1,
        pageSize = 20,
        email,
        name,
        filterLastName,
    } = params || {}

    const query = {
        page,
        pageSize,
        ...(email ? { email } : {}),
        ...(name ? { name } : {}),
        ...(filterLastName ? { filterLastName } : {}),
    }

    const response = await httpClient.get<ProfileShortDtoPagedListWithMetadata>(
        `${baseUrl}/list`,
        {
            params: query
        }
    )

    return response.data
}

export async function getUser(id: string): Promise<Profile> {
    const response = await httpClient.get<Profile>(`${baseUrl}/${id}`)
    return response.data
}

export async function updateUser(id: string, request: ProfileUpdateDto): Promise<void> {
    await httpClient.put<ProfileUpdateDto>(`${baseUrl}/${id}`, request)    
}

export async function getStudent(id:string):Promise<StudentProfile>{
    const response = await httpClient.get<StudentProfile>(`${baseUrl}/${id}/student`)
    return response.data
}

export async function getEmployee(id:string):Promise<EmployeeProfile>{
    const response = await httpClient.get<EmployeeProfile>(`${baseUrl}/${id}/employee`)
    return response.data
}

export async function updateAvatar(id:string, request: UpdateAvatarRequest): Promise<void> {
    await httpClient.put(`${baseUrl}/${id}/avatar`, request)
}