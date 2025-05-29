import { UserShortDto } from "../user";
import { EventParticipantType } from "./event-participant-type";

export interface EventParticipant{
    id:string,
    user:UserShortDto,
    email:string,
    phone:string,
    additionalInfo:string,
    participantType:EventParticipantType
}