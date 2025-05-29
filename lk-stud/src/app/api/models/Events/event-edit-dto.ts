import { EventAuditory } from "./event-auditory";
import { EventFormat } from "./event-format";
import { EventType } from "./event-type";

export interface EventEditDto {
    id: string;
    title?: string;
    description?: string;
    digestText?: string;
    pictureId?: string;
    isTimeFromNeeded: boolean;
    dateTimeFrom?: string;
    isTimeToNeeded: boolean;
    dateTimeTo?: string;
    link?: string;
    addressName?: string;
    latitude?: number;
    longitude?: number;
    isRegistrationRequired: boolean;
    registrationLastDate?: string;
    isDigestNeeded: boolean;
    notificationText?: string;
    type: EventType;
    format: EventFormat;
    auditory: EventAuditory;
}
