import { EventStatus } from "./event-status";

export interface EventEditStatusDto {
    id:string,
    newStatus: EventStatus
}