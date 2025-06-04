
import { CertificateReceiveType } from "./CertificateReceiveType";
import { CertitifcateStaffType } from "./CertificateStaffType";
import { CertificateType } from "./CertificateType";
import { CertificateUserType } from "./CertificateUserType";

export interface CertificateCreateDto {
    type: CertificateType,
    staffType: CertitifcateStaffType,
    userType: CertificateUserType,
    educationEntryId?: string,
    employeePostId?: string,
    receiveType: CertificateReceiveType
}