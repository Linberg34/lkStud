
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
    fetchEmployeeProfile,
    fetchProfile,
    fetchStudentProfile,
} from "../../../store/slices/profileSlice";
import {
    CertificatesPersonalData,
    EducationItem,
    ProfileItem, 
} from "../../../shared/ui/certificates-personal-data/certificates-personal-data.component";
import { CertificateOrder } from "../../../shared/ui/certificate-order/certificate-order.component";
import { CertificateCard } from "../../../shared/ui/certificate-card/certificate-card.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import { getCertificatesByEntity } from "../../api/services/certificates-service";
import "./certificates-page.component.css";
import { CertificateDto } from "../../api/models/certificates";
import { RoleSwitchComponent } from "../../../shared/ui/role-switch/role-switch.component";

export const CertificatesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, employee, student, status: profileStatus } = useSelector(
        (state: RootState) => state.profile
    );

    const [educationList, setEducationList] = useState<EducationItem[]>([]);
    const [employmentList, setEmploymentList] = useState<ProfileItem[]>([]);
    const [certificates, setCertificates] = useState<CertificateDto[]>([]);
    const [isWide, setIsWide] = useState(window.innerWidth > 1201);
    const [selectedRole, setSelectedRole] = useState<string>("");

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (!profile) return;

        if (
            !selectedRole ||
            !profile.userTypes.includes(selectedRole as "Student" | "Employee")
        ) {
            setSelectedRole(profile.userTypes[0]);
        }

        if (profile.userTypes.includes("Student")) {
            dispatch(fetchStudentProfile());
        }
        if (profile.userTypes.includes("Employee")) {
            dispatch(fetchEmployeeProfile());
        }
    }, [dispatch, profile]);

    useEffect(() => {
        if (!student?.educationEntries) {
            setEducationList([]);
            return;
        }
        const list: EducationItem[] = student.educationEntries.map((e) => ({
            title: e.faculty?.name ?? "",
            level: e.educationLevel?.name ?? "",
            status: e.educationStatus?.name ?? "",
            faculty: e.faculty?.name ?? "",
            direction: e.educationDirection?.name ?? "",
            group: e.group?.name ?? "",
        }));
        setEducationList(list);
    }, [student]);

    useEffect(() => {
        if (!employee?.posts?.length) {
            setEmploymentList([]);
            return;
        }

        const list: ProfileItem[] = employee.posts.map((post) => {
            const deptNames = post.departments
                .map((d) => d.name)       
                .filter((n) => !!n)      
                .join(", ");

            return {
                title: post.postName?.name || "Без названия",

                level: "",
                status: "",

                position: post.postName?.name || "",       
                postType: post.postType?.name || "",        
                department: deptNames || "",                
                employmentType: post.employmentType || "",  
                dateStart: post.dateStart || "",           
                dateEnd: post.dateEnd || "",                
                rate: post.rate,                            
            };
        });

        setEmploymentList(list);
    }, [employee]);

    useEffect(() => {
        if (!profile?.id || !selectedRole) {
            setCertificates([]);
            return;
        }
        if (selectedRole === "Student") {
            getCertificatesByEntity("Student", profile.id)
                .then((res) => setCertificates(res))
                .catch(() => setCertificates([]));
        }
        if (selectedRole === "Employee") {
            getCertificatesByEntity("Employee", profile.id)
                .then((res) => setCertificates(res))
                .catch(() => setCertificates([]));
        }
    }, [profile, selectedRole]);

    useEffect(() => {
        const handleResize = () => setIsWide(window.innerWidth > 1201);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (profileStatus === "loading") {
        return <div>Загрузка...</div>;
    }

    const tabsData: ProfileItem[] =
        selectedRole === "Student" ? educationList : employmentList;

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
                        <CertificatesPersonalData profileItems={tabsData} />

                        <CertificateOrder
                            onSave={() => {
                            }}
                            certificateType="ForPlaceWhereNeeded"
                            certificateReceiveType="Electronic"
                        />

                        <div className="certificates-page__cert-list">
                            {certificates.map((cert) => (
                                <CertificateCard
                                    key={cert.id}
                                    date={cert.dateOfForming || ""}
                                    certificateType={cert.type}
                                    certificateReceiveType={cert.receiveType}
                                    certificateStatus={cert.status}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
