
import { CertificateCreateDto, CertificateDto, CertificateUserType } from "../models/certificates";
import httpClient from "./http-client";


const CertificatesUrl = "/Certificates";


export async function getCertificatesByEntity(
    userType: CertificateUserType,
    ownerId: string
): Promise<CertificateDto[]> {
    const response = await httpClient.get<CertificateDto[]>(
        `${CertificatesUrl}/userType/${userType}/entity/${ownerId}`
    );
    return response.data;
}


export async function createCertificate(
    dto: CertificateCreateDto
): Promise<CertificateDto> {
    const response = await httpClient.post<CertificateDto>(
        CertificatesUrl,
        dto
    );
    return response.data;
}
