import React, { useEffect, useState, useRef } from "react"
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
import Cropper, { Area } from "react-easy-crop"
import { uploadFile } from "../../api/services/files-service"
import { getCroppedImg } from "../../../shared/utils/getCropImage"
import { updateAvatar } from "../../api/services/profile-service"

//TODO: Пофиксить отображение хедера в мобильной версии
// TODO: Сделать кастомные ошибки

export const ProfilePageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { profile, student, employee, status, error } = useSelector(
        (s: RootState) => s.profile
    )

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [src, setSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedPixels, setCroppedPixels] = useState<Area | null>(null)
    const [showCropper, setShowCropper] = useState(false)

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


    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        setSrc(URL.createObjectURL(f))
        setShowCropper(true)
    }

    const onSaveCropped = async () => {
        if (!src || !croppedPixels) return
        const blob = await getCroppedImg(src, croppedPixels)
        console.log("Blob size:", blob.size);
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" })
        const result = await uploadFile(file)
        await updateAvatar({ fileId: result.id })
        dispatch(fetchProfile())
        setShowCropper(false)
    }

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
                    onAvatarClick={() => fileInputRef.current?.click()}
                    personalData={personalData}
                    contacts={contacts}
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={onSelectFile}
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

            {showCropper && src && (
                <div className="cropper-overlay">
                    <div className="cropper-container">
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={(_, pixels) => setCroppedPixels(pixels)}
                            onZoomChange={setZoom}
                        />
                        <div className="cropper-controls">
                            <button onClick={onSaveCropped}>Сохранить</button>
                            <button onClick={() => setShowCropper(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            <Outlet />
        </div>
    )

}