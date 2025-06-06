import { BaseDictionaryDto } from '../base-dictionary-dto'
import { Department } from './department'

export interface Post {
    id: string
    rate: number
    departments: Department[]
    postType: BaseDictionaryDto
    postName: BaseDictionaryDto
    dateStart: string  
    dateEnd: string  
    employmentType: string
}
