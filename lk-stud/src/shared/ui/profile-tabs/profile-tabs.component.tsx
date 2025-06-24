import  { useState } from "react";
import { ProfileEducationDataComponent, EducationItem } from "../profile-education-data/profile-education-data.component";
import { ProfileWorkDataComponent, WorkItem } from "../profile-education-data/profile-work-data.component";
import "./profile-tabs.component.css";
import { usePageTranslations } from "../../hooks/usePageTranslations";

interface ProfileTabsProps {
    educationList: EducationItem[];
    workList: WorkItem[];
}

export const ProfileTabsComponent: React.FC<ProfileTabsProps> = ({
    educationList,
    workList
}) => {
    const hasEducation = educationList.length > 0
    const hasWork = workList.length > 0
    const defaultTab: "education" | "work" = hasEducation ? "education" : "work"
    const [activeTab, setActiveTab] = useState<"education" | "work">(defaultTab)
    const t = usePageTranslations("profile")
    

    return (
        <div className="profile-education-data-component">
            <div className="profile-education-data__tabs">
                {hasEducation && (
                    <span
                        className={activeTab === "education" ? "active" : ""}
                        onClick={() => setActiveTab("education")}
                    >
                        {t.education}
                    </span>
                )}
                {hasWork && (
                    <span
                        className={activeTab === "work" ? "active" : ""}
                        onClick={() => setActiveTab("work")}
                    >
                        {t.employment}
                    </span>
                )}
            </div>


            {activeTab === "education" && (
                <ProfileEducationDataComponent educationList={educationList} />
            )}

            {activeTab === "work" && (
                <ProfileWorkDataComponent workList={workList} />
            )}
        </div>
    );
};