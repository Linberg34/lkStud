import { FileDto } from "../Files";
import { EventAuditory } from "./event-auditory";
import { EventFormat } from "./event-format";
import { EventStatus } from "./event-status";
import { EventType } from "./event-type";

export interface EventShortDto {
    id: string;
    title: string;
    description?: string;
    picture?: FileDto;
    isTimeFromNeeded: boolean;
    dateTimeFrom?: string;
    isTimeToNeeded: boolean;
    dateTimeTo?: string;
    type: EventType;
    format: EventFormat;
    auditory: EventAuditory;
    status: EventStatus;
}