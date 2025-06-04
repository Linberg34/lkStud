import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchProfile, fetchStudentProfile } from "../../../store/slices/profileSlice";
import { EducationItem, CertificatesPersonalData } from "../../../shared/ui/certificates-personal-data/certificates-personal-data.component";
import { CertificateOrder } from "../../../shared/ui/certificate-order/certificate-order.component";
import { CertificateCard } from "../../../shared/ui/certificate-card/certificate-card.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import {  getCertificatesByEntity } from "../../api/services/certificates-service";
import "./certificates-page.component.css";
import { CertificateDto } from "../../api/models/certificates";

export const CertificatesPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, student, status: profileStatus } = useSelector((state: RootState) => state.profile);
    const [educationList, setEducationList] = useState<EducationItem[]>([]);
    const [certificates, setCertificates] = useState<CertificateDto[]>([]);
    const [isWide, setIsWide] = useState(window.innerWidth > 1201);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile?.userTypes.includes("Student")) {
            dispatch(fetchStudentProfile());
        }
    }, [dispatch, profile]);

    useEffect(() => {
        if (student?.educationEntries) {
            const list: EducationItem[] = student.educationEntries.map((e) => ({
                title: e.faculty?.name ?? "",
                level: e.educationLevel?.name ?? "",
                status: e.educationStatus?.name ?? "",
                faculty: e.faculty?.name ?? "",
                direction: e.educationDirection?.name ?? "",
                group: e.group?.name ?? "",
            }));
            setEducationList(list);
        }
    }, [student]);

    useEffect(() => {
        if (profile?.id && profile.userTypes.includes("Student")) {
            getCertificatesByEntity("Student", profile.id)
                .then((res) => setCertificates(res))
                .catch(() => setCertificates([]));
        }
        if (profile?.id && profile.userTypes.includes("Employee")) {
            getCertificatesByEntity("Employee", profile.id)
                .then((res) => setCertificates(res))
                .catch(() => setCertificates([]));
        }
    }, [profile]);

    useEffect(() => {
        const handleResize = () => setIsWide(window.innerWidth > 1201);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (profileStatus === "loading") {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="certificates-page__component">
            {isWide && <MenuComponent />}
            <div className="certificates-page__wrapper">
                <HeaderComponent title="Справки" />
                <NavigationComponent />
                <h2 className="certificates-page__title">Справки</h2>
                <div className="certificates-page__content">
                    {educationList.length >= 2 && (
                        <CertificatesPersonalData educationList={[educationList[0], educationList[1]]} />
                    )}
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
    );
};
