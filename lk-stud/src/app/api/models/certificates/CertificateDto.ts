import { EnumDto } from "../EnumDto";
import { FileDto } from "../Files";
import { CertificateReceiveType } from "./CertificateReceiveType";
import { CertitifcateStaffType } from "./CertificateStaffType";
import { CertificateStatus } from "./CertificateStatus";
import { CertificateType } from "./CertificateType";
import { CertificateUserType } from "./CertificateUserType";


export interface CertificateDto {

    id: string,
    status: CertificateStatus,
    statusEnumDto: EnumDto,
    type: CertificateType,
    staffType: CertitifcateStaffType,
    typeEnumDto: EnumDto,
    staffTypeEnumDto: EnumDto,
    userType: CertificateUserType,
    userTypeEnumDto: EnumDto,
    certificateFile: FileDto,
    signatureFIle: FileDto,
    dateOfForming?: string,
    receiveType: CertificateReceiveType,
    receiveTypeEnumDto: EnumDto
}