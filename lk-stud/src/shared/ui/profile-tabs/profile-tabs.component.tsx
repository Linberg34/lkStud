import React, { useState } from "react";
import { ProfileEducationDataComponent, EducationItem} from "../profile-education-data/profile-education-data.component";
import { ProfileWorkDataComponent , WorkItem} from "../profile-education-data/profile-work-data.component";
import "./profile-tabs.component.css";

interface ProfileTabsProps {
    educationList: EducationItem[];
    workList: WorkItem[];
}

export const ProfileTabsComponent: React.FC<ProfileTabsProps> = ({
    educationList,
    workList
}) => {
    const [activeTab, setActiveTab] = useState<"education" | "work">("education");

    return (
        <div className="profile-education-data-component">
            <div className="profile-education-data__tabs">
                <span 
                    className={activeTab === "education" ? "active" : ""} 
                    onClick={() => setActiveTab("education")}
                >
                    Образование
                </span>
                <span 
                    className={activeTab === "work" ? "active" : ""} 
                    onClick={() => setActiveTab("work")}
                >
                    Работа
                </span>
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