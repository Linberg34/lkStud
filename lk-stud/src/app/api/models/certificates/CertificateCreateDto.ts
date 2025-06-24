
import { CertificateReceiveType } from "./CertificateReceiveType";
import { CertificateStaffType } from "./CertificateStaffType";
import { CertificateType } from "./CertificateType";
import { CertificateUserType } from "./CertificateUserType";

export interface CertificateCreateDto {
    type: CertificateType,
    staffType?: CertificateStaffType,
    userType: CertificateUserType,
    educationEntryId?: string,
    employeePostId?: string,
    receiveType: CertificateReceiveType
}