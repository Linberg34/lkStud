import { EventCreateDto, EventDto, EventEditDto, EventEditStatusDto, EventExternalRegisterDto, EventFormat, EventShortDtoPagedListWithMetaData, EventStatus, EventType } from "../models/Events"
import httpClient from "./http-client"

const EventsUrl = "/Events"

export interface GetEventsParams {
    status?: EventStatus
    eventType?: EventType
    name?: string
    format?: EventFormat
    eventDate?: string
    timezoneOffset?: number
    page?: number
    pageSize?: number
}

export async function getPublicEvents(params: GetEventsParams): Promise<EventShortDtoPagedListWithMetaData>{
    const response = await httpClient.get<EventShortDtoPagedListWithMetaData>(
        `${EventsUrl}/public`,
        { params }
    )
    return response.data
}


    export const getPublicEventsAuth = (params: GetEventsParams) =>
        httpClient.get<EventShortDtoPagedListWithMetaData>(
            `${EventsUrl}/public/auth`,
            { params }
        )

    export const getPublicEventById = (id: string, params: GetEventsParams) =>
        httpClient.get<EventDto>(
            `${EventsUrl}/public/${id}}`,
            { params }
        )

    export const isParticipant = (id: string) =>
        httpClient.get(
            `${EventsUrl}/is_participant/${id}`
        )

    export const registerInnerParticipant = () =>
        httpClient.post(
            `${EventsUrl}/register/inner`
        )

    export const registerExternalParticipant = () =>
        httpClient.post<EventExternalRegisterDto>(
            `${EventsUrl}/register/external`
        )

    export const getEventsForAdmin = (params: GetEventsParams) => (
        httpClient.get<EventShortDtoPagedListWithMetaData>(
            `${EventsUrl}`,
            { params }
        )
    )

    export const createEvent = () =>
        httpClient.post<EventCreateDto>(
            `${EventsUrl}`
        )

    export const editEvent = () =>
        httpClient.put<EventEditDto>(
            `${EventsUrl}`
        )

    export const deleteEvent = () =>
        httpClient.delete(
            `${EventsUrl}`
        )

    export const getFullEventDetails = (id: string) =>
        httpClient.get<EventDto>(
            `${EventsUrl}/${id}`
        )

    export const editEventStatus = (id: string) =>
        httpClient.put<EventEditStatusDto>(
            `${EventsUrl}/${id}/status`
        )