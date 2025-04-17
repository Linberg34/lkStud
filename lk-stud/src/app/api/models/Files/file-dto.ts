import { FileExtension } from './file-extension'

export interface FileDto {
    id: string
    name: string
    extension: FileExtension
    size: number
}
