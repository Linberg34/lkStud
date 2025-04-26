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
import { userTypeMap } from "../../../shared/utils/maps/user-type-map"
import { userGenderMap } from "../../../shared/utils/maps/user-gender-map"
import { contactTypesMap } from "../../../shared/utils/maps/contact-types-map"
import { employmentTypesMap } from "../../../shared/utils/maps/employment-types-map"
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations"

export const ProfilePageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { profile, student, employee, status, error } = useSelector(
        (s: RootState) => s.profile
    )

    const fileId = profile?.avatar?.id
    const t = usePageTranslations("profile")
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
        { label: t.gender, value: userGenderMap[profile.gender] || profile.gender },
        { label: t.birthday, value: profile.birthDate },
        { label: t.citizenship, value: profile.citizenship.name },
        { label: t.address, value: profile.address },
        { label: t.email, value: profile.email },
        { label: "Тип пользователя", value: profile.userTypes.map((type) => userTypeMap[type] || type).join(", ") },
    ]

    const contacts = profile.contacts.map((c) => ({
        label: contactTypesMap[c.type] || c.type,
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

    const workList = employee?.posts.map((p, index) => ({
        positionName: p.postName.name,
        rate: String(p.rate),
        employmentType: employmentTypesMap[p.employmentType],
        workPlace: p.departments[0]?.name || "",
        department: p.departments[0]?.name || "",
        positionType: p.postType.name,
        direction: "",
        startDate: p.dateStart,
        endDate: p.dateEnd,
        totalExperience: index === 0
            ? employee.experience.find(e => e.type === "Common")
                ? `${employee.experience.find(e => e.type === "Common")!.years} г. ${employee.experience.find(e => e.type === "Common")!.months} мес.`
                : undefined
            : undefined,
        pedagogyExperience: index === 0
            ? employee.experience.find(e => e.type === "Pedagogical")
                ? `${employee.experience.find(e => e.type === "Pedagogical")!.years} г. ${employee.experience.find(e => e.type === "Pedagogical")!.months} мес.`
                : undefined
            : undefined,
        currentWorkExperience: undefined
    })) || []


    return (
        <div className="profile-page-component">
            <div className="profile-page-component__title-name">
                <h1 className="profile-page-component__title">{t.title}</h1>
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