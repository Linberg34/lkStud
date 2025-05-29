import { FileDto } from "../Files";
import { UserShortDto } from "../user";
import { EventAuditory } from "./event-auditory";
import { EventFormat } from "./event-format";
import { EventParticipant } from "./event-participant-dto";
import { EventStatus } from "./event-status";
import { EventType } from "./event-type";

export interface EventDto {
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
    link?: string;
    addressName?: string;
    latitude?: number;
    longitude?: number;
    isRegistrationRequired: boolean;
    registrationLastDate?: string;
    isDigestNeeded: boolean;
    notificationText?: string;
    digestText?: string;
    author?: UserShortDto;
    participants?: EventParticipant[];
}