import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import "./profile-page.component.css"
import { ProfilePersonalDataComponent } from "../../../shared/ui/profile-personal-data/profile-personal-data.component"
import { ProfileTabsComponent } from "../../../shared/ui/profile-tabs/profile-tabs.component"
import { useAvatarUrl } from "../../../shared/hooks/useAvatar"
import {
    fetchProfile,
    fetchStudentProfile,
    fetchEmployeeProfile,
} from "../../../store/slices/profileSlice"
import type { RootState, AppDispatch } from "../../../store/store"

export const ProfilePageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { profile, student, employee, status, error } = useSelector(
        (s: RootState) => s.profile
    )
    
    const fileId = profile?.avatar?.id
    const { url: avatarUrl } = useAvatarUrl(fileId)
    
    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])
    
    useEffect(() => {
        if (profile?.userTypes.includes("Student")) {
            dispatch(fetchStudentProfile())
        }
        if (profile?.userTypes.includes("Employee")) {
            dispatch(fetchEmployeeProfile())
        }
    }, [dispatch, profile])
    
    if (status === "loading") return <div>Загрузка профиля…</div>
    if (error) return <div className="error">Ошибка: {error}</div>
    if (!profile) return null
    
    const personalData = [
        { label: "Пол", value: profile.gender },
        { label: "Дата рождения", value: profile.birthDate },
        { label: "Гражданство", value: profile.citizenship.name },
        { label: "Адрес", value: profile.address },
        { label: "Email", value: profile.email },
        { label: "Тип пользователя", value: profile.userTypes.join(", ") },
    ]
    
    const contacts = profile.contacts.map((c) => ({
        label: c.type,
        value: c.value,
    }))
    
    const educationList =
        student?.educationEntries.map((e) => ({
            level: e.educationLevel.name,
            status: e.educationStatus.name,
            years: e.educationYears.name,
            recordBook: e.creditBooknumber,
            studyForm: e.educationForm.name,
            basis: e.educationBase.name,
            faculty: e.faculty.name,
            direction: e.educationDirection.name,
            profile: e.educationProfile.name,
            course: String(e.course),
            group: e.group.name,
        })) || []
        
    const workList =
        employee?.posts.map((p) => ({
            positionName: p.postName.name,
            rate: String(p.rate),
            employmentType: p.employmentType,
            workPlace: p.departments[0]?.name || "",
            department: p.departments[0]?.name || "",
            positionType: p.postType.name,
            direction: "",
            startDate: p.dateStart,
            endDate: p.dateEnd,
            totalExperience: employee.experience
                .map((exp) => `${exp.years} г. ${exp.months} мес.`)
                .join("; "),
            pedagogyExperience: undefined,
            currentWorkExperience: undefined,
        })) || []
        
    return (
        <div className="profile-page-component">
            <div className="profile-page-component__title-name">
                <h1 className="profile-page-component__title">Профиль</h1>
                <h2 className="profile-page-component__title-profile-name">
                    {profile.lastName} {profile.firstName} {profile.patronymic}
                </h2>
            </div>
            
            <div className="profile-page-component__all-content-wrapper">
                <ProfilePersonalDataComponent
                    imageSrc={avatarUrl || ""}
                    personalData={personalData}
                    contacts={contacts}
                />
                
                <div className="profile-page-component__main">
                    <h2 className="profile-page-component__name">
                        {profile.lastName} {profile.firstName}
                    </h2>
                    
                    <ProfileTabsComponent
                        educationList={educationList}
                        workList={workList}
                    />
                </div>
            </div>
            
            <Outlet />
        </div>
    )
}