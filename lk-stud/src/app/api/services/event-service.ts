import {
    EventCreateDto,
    EventDto,
    EventEditDto,
    EventEditStatusDto,
    EventExternalRegisterDto,
    EventFormat,
    EventInnerRegisterDto,
    EventShortDtoPagedListWithMetaData,
    EventStatus,
    EventType
} from "../models/Events"
import httpClient from "./http-client"
import qs from "qs";

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

export async function getPublicEvents(params: GetEventsParams): Promise<EventShortDtoPagedListWithMetaData> {
    const response = await httpClient.get<EventShortDtoPagedListWithMetaData>(
        `${EventsUrl}/public`,
        { params }
    )
    return response.data
}


export async function getPublicEventById(id: string): Promise<EventDto> {
    const response = await httpClient.get<EventDto>(
        `${EventsUrl}/public/${id}`
    );
    return response.data;
}

export async function isParticipant(id: string): Promise<number> {
    const response = await httpClient.get(
        `${EventsUrl}/is_participant/${id}`
    );
    return response.status;
}

export async function registerInnerParticipant(
    dto: EventInnerRegisterDto
): Promise<number> {
    const response = await httpClient.post(`${EventsUrl}/register/inner`, dto);
    return response.status
}

export async function registerExternalParticipant(
    dto: EventExternalRegisterDto
): Promise<number> {
    const response = await httpClient.post(`${EventsUrl}/register/external`, dto);
    return response.status
}

export async function getEventsForAdmin(
    params: GetEventsParams
): Promise<EventShortDtoPagedListWithMetaData> {
    const response = await httpClient.get<EventShortDtoPagedListWithMetaData>(
        `${EventsUrl}`,
        {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: "repeat" }),
        }
    );
    return response.data;
}

export async function createEvent(): Promise<EventCreateDto> {
    const response = await httpClient.post<EventCreateDto>(`${EventsUrl}`);
    return response.data;
}

export async function editEvent(): Promise<EventEditDto> {
    const response = await httpClient.put<EventEditDto>(`${EventsUrl}`);
    return response.data;
}

export async function deleteEvent(): Promise<void> {
    await httpClient.delete(`${EventsUrl}`);
}

export async function getFullEventDetails(id: string): Promise<EventDto> {
    const response = await httpClient.get<EventDto>(`${EventsUrl}/${id}`);
    return response.data;
}

export async function editEventStatus(
    id: string
): Promise<EventEditStatusDto> {
    const response = await httpClient.put<EventEditStatusDto>(
        `${EventsUrl}/${id}/status`
    );
    return response.data;
}