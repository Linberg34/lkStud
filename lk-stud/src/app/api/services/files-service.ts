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
    const form = new FormData();
    form.append("file", file);
    const response = await httpClient.post<FileResultDto>(
        FilesUrl,
        form,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            },
        }
    );
    return response.data
}
