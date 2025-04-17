import { LookupItem } from '../lookup-item'

export interface EducationEntry {
    id: string
    faculty: LookupItem
    group: LookupItem
    educationStatus: LookupItem
    educationBase: LookupItem
    educationDirection: LookupItem
    educationProfile: LookupItem
    educationQualification: LookupItem
    educationLevel: LookupItem
    educationForm: LookupItem
    educationYears: LookupItem
    creditBooknumber: string
    course: number
    admissionYear: number
}
