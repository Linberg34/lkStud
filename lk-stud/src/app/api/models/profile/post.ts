import { LookupItem } from '../lookup-item'
import { Department } from './department'

export interface Post {
    id: string
    rate: number
    departments: Department[]
    postType: LookupItem
    postName: LookupItem
    dateStart: string  
    dateEnd: string  
    employmentType: string
}
