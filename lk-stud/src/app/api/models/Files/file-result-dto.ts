
import { FileExtension } from './file-extension'

export interface FileResultDto {
    id: string
    name: string
    extension: FileExtension
    size: number
}
