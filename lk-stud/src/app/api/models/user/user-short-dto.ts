import { FileDto } from "../Files"
import { Gender } from "../profile"

export interface UserShortDto{
    id: string
    lastName:string,
    firstName:string,
    patronymic:string,
    birthDate:Date,
    gender:Gender,
    email:string,
    avatar: FileDto
}