import { BaseDictionaryDto } from '../base-dictionary-dto'

export interface EducationEntry {
    id: string
    faculty: BaseDictionaryDto
    group: BaseDictionaryDto
    educationStatus: BaseDictionaryDto
    educationBase: BaseDictionaryDto
    educationDirection: BaseDictionaryDto
    educationProfile: BaseDictionaryDto
    educationQualification: BaseDictionaryDto
    educationLevel: BaseDictionaryDto
    educationForm: BaseDictionaryDto
    educationYears: BaseDictionaryDto
    creditBooknumber: string
    course: number
    admissionYear: number
}
