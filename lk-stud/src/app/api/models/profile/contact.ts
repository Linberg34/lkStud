export type ContactType = 'Phone' | 'Email' | string

export interface Contact {
    value: string
    type: ContactType
}
