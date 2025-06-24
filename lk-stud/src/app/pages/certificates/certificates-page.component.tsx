import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store/store"
import {
    fetchEmployeeProfile,
    fetchProfile,
    fetchStudentProfile,
} from "../../../store/slices/profileSlice"
import {
    CertificatesPersonalData,
    EducationItem,
    ProfileItem,
} from "../../../shared/ui/certificates-personal-data/certificates-personal-data.component"
import { CertificateOrder } from "../../../shared/ui/certificate-order/certificate-order.component"
import { CertificateCard } from "../../../shared/ui/certificate-card/certificate-card.component"
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component"
import { MenuComponent } from "../../../shared/ui/menu/menu.component"
import { HeaderComponent } from "../../../shared/ui/header/header.component"
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component"
import {
    getCertificatesByEntity,
    createCertificate,
} from "../../api/services/certificates-service"
import { getFileBlob } from "../../api/services/files-service"
import { CertificateCreateDto, CertificateDto, CertificateReceiveType, CertificateType, CertificateUserType } from "../../api/models/certificates"
import { RoleSwitchComponent } from "../../../shared/ui/role-switch/role-switch.component"
import { CertificateErrorComponent } from "../../../shared/ui/certificate-error/certificate-error.component"
import "./certificates-page.component.css"
import { AxiosError } from "axios"

export const CertificatesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { profile, employee, student, status: profileStatus } = useSelector(
        (state: RootState) => state.profile
    )

    const [educationList, setEducationList] = useState<EducationItem[]>([])
    const [employmentList, setEmploymentList] = useState<ProfileItem[]>([])
    const [certificates, setCertificates] = useState<CertificateDto[]>([])
    const [isWide, setIsWide] = useState(window.innerWidth > 1201)
    const [selectedRole, setSelectedRole] = useState<string>("")
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [errorOpen, setErrorOpen] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const pageSize = 15
    const totalPages = Math.ceil(certificates.length / pageSize)
    const displayedCertificates = certificates.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    useEffect(() => {
        setActiveIndex(0)
        setCurrentPage(1)
    }, [selectedRole, educationList, employmentList])

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        if (!profile) return
        if (
            !selectedRole ||
            !profile.userTypes.includes(selectedRole as "Student" | "Employee")
        ) {
            setSelectedRole(profile.userTypes[0])
        }
        if (profile.userTypes.includes("Student")) {
            dispatch(fetchStudentProfile())
        }
        if (profile.userTypes.includes("Employee")) {
            dispatch(fetchEmployeeProfile())
        }
    }, [dispatch, profile])

    useEffect(() => {
        if (!student?.educationEntries) {
            setEducationList([])
            return
        }
        setEducationList(
            student.educationEntries.map((e) => ({
                title: e.faculty?.name ?? "",
                level: e.educationLevel?.name ?? "",
                status: e.educationStatus?.name ?? "",
                faculty: e.faculty?.name ?? "",
                direction: e.educationDirection?.name ?? "",
                group: e.group?.name ?? "",
            }))
        )
    }, [student])

    useEffect(() => {
        if (!employee?.posts?.length) {
            setEmploymentList([])
            return
        }
        setEmploymentList(
            employee.posts.map((post) => {
                const deptNames = post.departments.map((d) => d.name).filter(Boolean).join(", ")
                return {
                    title: post.postName.name || "Без названия",
                    level: "",
                    status: "",
                    position: post.postName.name || "",
                    postType: post.postType.name || "",
                    department: deptNames,
                    employmentType: post.employmentType,
                    dateStart: post.dateStart,
                    dateEnd: post.dateEnd,
                    rate: post.rate,
                }
            })
        )
    }, [employee])

    useEffect(() => {
        let ownerId: string | undefined
        if (selectedRole === "Student") {
            const entry = student?.educationEntries[activeIndex]
            if (entry) ownerId = entry.id
        } else {
            const post = employee?.posts[activeIndex]
            if (post) ownerId = post.id
        }
        if (!ownerId) {
            setCertificates([])
            return
        }
        getCertificatesByEntity(selectedRole as CertificateUserType, ownerId)
            .then((res) => setCertificates(res))
            .catch(() => setCertificates([]))
    }, [selectedRole, activeIndex, student, employee])

    useEffect(() => {
        const handleResize = () => setIsWide(window.innerWidth > 1201)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (profileStatus === "loading") {
        return <div>Загрузка...</div>
    }

    const handleSave = (type: CertificateType, receiveType: CertificateReceiveType) => {
        const dto: CertificateCreateDto = {
            type,
            staffType: 'ForVisa',
            userType: selectedRole as CertificateUserType,
            educationEntryId:
                selectedRole === 'Student'
                    ? student?.educationEntries[activeIndex]?.id
                    : undefined,
            employeePostId:
                selectedRole === 'Employee'
                    ? employee?.posts[activeIndex]?.id
                    : undefined,
            receiveType,
        }
        createCertificate(dto)
            .then(() => {
                const ownerId =
                    selectedRole === 'Student'
                        ? student!.educationEntries[activeIndex]!.id
                        : employee!.posts[activeIndex]!.id
                return getCertificatesByEntity(selectedRole as CertificateUserType, ownerId)
            })
            .then((freshList) => {
                setCertificates(freshList)
                setCurrentPage(1)
            })
            .catch((err: AxiosError<{ Detail: string }>) => {
                if (
                    err.response?.status === 400 &&
                    err.response.data.Detail.includes('Certificate with same type in process')
                ) {
                    setErrorOpen(true)
                } else {
                    console.error(err)
                }
            })
    }


    const handleDownload = async (fileId: string, fileName = "file") => {
        try {
            const blob = await getFileBlob(fileId)
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = fileName
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error(error)
        }
    }

    const tabsData: ProfileItem[] =
        selectedRole === "Student" ? educationList : employmentList

    return (
        <div className="certificates-page__component">
            {isWide && <MenuComponent />}
            <div className="certificates-page__wrapper">
                <HeaderComponent title="Справки" />
                <NavigationComponent />
                <h2 className="certificates-page__title">Заказ Справки</h2>
                <div className="certificates-page__content-wrapper">
                    {profile?.userTypes.includes("Student") &&
                        profile.userTypes.includes("Employee") && (
                            <RoleSwitchComponent
                                role={selectedRole}
                                onRoleChange={setSelectedRole}
                            />
                        )}
                    <div className="certificates-page__content">
                        <CertificatesPersonalData
                            profileItems={tabsData}
                            activeIndex={activeIndex}
                            onTabChange={setActiveIndex}
                        />
                        <CertificateOrder
                            role={selectedRole}
                            certificateType={
                                selectedRole === "Student"
                                    ? "ForPlaceWhereNeeded"
                                    : undefined
                            }
                            certificateStaffType={
                                selectedRole === "Employee" ? "ForPlaceOfWork" : undefined
                            }
                            certificateReceiveType="Electronic"
                            onSave={(type, receiveType) =>
                                handleSave(type as CertificateType, receiveType)
                            }
                        />
                        <div className="certificates-page__cert-list">
                            {displayedCertificates.map((cert) => (
                                <CertificateCard
                                    key={cert.id}
                                    date={cert.dateOfForming || ""}
                                    certificateType={cert.type || cert.staffType}
                                    certificateReceiveType={cert.receiveType}
                                    certificateStatus={cert.status}
                                    onDownloadSignature={() =>
                                        handleDownload(cert.signatureFile.id)
                                    }
                                    onDownloadCertificate={() =>
                                        handleDownload(cert.certificateFile.id)
                                    }
                                />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <PaginationComponent
                                count={totalPages}
                                page={currentPage}
                                onChange={setCurrentPage}
                            />
                        )}
                    </div>
                </div>
                {errorOpen && <CertificateErrorComponent onClose={() => setErrorOpen(false)} />}
            </div>
        </div>
    )
}
