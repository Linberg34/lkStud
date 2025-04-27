import httpClient from "./http-client"
import {
    UsefulServiceDtoPagedListWithMetadata,
    UsefulServiceCategory,
    UsefulServiceEditCreateDto
} from "../models/useful-services"

const baseUrl = "/UsefulServices"

export async function getUsefulServices(
    params?: {
        categories?: UsefulServiceCategory[]
        page?: number
        pageSize?: number
    }
): Promise<UsefulServiceDtoPagedListWithMetadata> {
    const response = await httpClient.get<UsefulServiceDtoPagedListWithMetadata>(
        baseUrl,
        { params }
    )
    return response.data
}

export async function createUsefulService(): Promise<UsefulServiceEditCreateDto> {
    const response = await httpClient.post<UsefulServiceEditCreateDto>(
        baseUrl
    )
    return response.data
}

export async function updateUsefulService(
    id: string,
    request: UsefulServiceEditCreateDto
): Promise<UsefulServiceEditCreateDto> {
    const response = await httpClient.put<UsefulServiceEditCreateDto>(
        `${baseUrl}/${id}`,
        request
    )
    return response.data
}

export async function deleteUsefulService(id: string): Promise<void> {
    await httpClient.delete(`${baseUrl}/${id}`)
}
