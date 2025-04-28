import httpClient from "./http-client"
import {
    UsefulServiceDtoPagedListWithMetadata,
    UsefulServiceCategory,
    UsefulServiceEditCreateDto
} from "../models/useful-services"
import qs from "qs"
const baseUrl = "/UsefulServices"


export async function getUsefulServices(params?: {
    categories?: UsefulServiceCategory[]
    page?: number
    pageSize?: number
}): Promise<UsefulServiceDtoPagedListWithMetadata> {
    const {
        categories = [],
        page = 1,
        pageSize = 20,
    } = params || {}

    const query = { page, pageSize, categories }

    const response = await httpClient.get<UsefulServiceDtoPagedListWithMetadata>(
        baseUrl,
        {
            params: query,
            paramsSerializer: params =>
                qs.stringify(params, { arrayFormat: 'repeat' })
        }
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
