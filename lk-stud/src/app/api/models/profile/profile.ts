import { Avatar } from './avatar'
import { Country } from './country'
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
    citizenship: Country
    address: string
    contacts: Contact[]
    userTypes: UserType[]
}
