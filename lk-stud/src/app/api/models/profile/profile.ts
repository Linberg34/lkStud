import { Avatar } from './avatar'
import { Citizenship } from './citizenship'
import { Contact } from './contact'

export type Gender = 'Male' | 'Female' | 'NotDefined' | string
export type UserType = 'Student' | 'Employee' | string

export interface Profile {
    id: string
    email: string
    lastName: string
    firstName: string
    patronymic: string
    birthDate: string      
    gender: Gender
    avatar: Avatar
    citizenship: Citizenship
    address: string
    contacts: Contact[]
    userTypes: UserType[]
}
