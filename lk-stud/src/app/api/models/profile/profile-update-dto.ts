import { Gender } from "./profile";

export interface ProfileUpdateDto{
    lastName?: string,
    firstName?: string,
    patronymic?: string,
    birthDate?: Date,
    gender:Gender
}