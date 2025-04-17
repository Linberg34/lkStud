import httpClient from "./http-client"
import { FileResultDto } from "../models/Files/index"

const FilesUrl = "/Files"

export async function getFileBlob(fileId: string): Promise<Blob> {
    const response = await httpClient.getBlob(`${FilesUrl}/${fileId}`, {
        responseType: "blob",
    })
    return response.data
}

export async function uploadFile(file: File): Promise<FileResultDto> {
    const blob = await file.arrayBuffer()
    const response = await httpClient.post<FileResultDto>(
        FilesUrl,
        blob,
        {
            headers: {
                "Content-Type": file.type || "application/octet-stream",
                Accept: "application/json",
            },
        }
    )
    return response.data
}
