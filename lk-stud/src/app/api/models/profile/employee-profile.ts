import { Experience } from './experience'
import { Post } from './post'

export interface EmployeeProfile {
    id: string
    experience: Experience[]
    posts: Post[]
}
