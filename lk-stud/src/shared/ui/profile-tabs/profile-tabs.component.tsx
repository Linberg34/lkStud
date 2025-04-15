import React, { useState } from "react";
import { ProfileEducationDataComponent } from "../profile-education-data/profile-education-data.component";
import { ProfileWorkDataComponent } from "../profile-education-data/profile-work-data.component";
import "./profile-tabs.component.css";

interface EducationItem {
    level: string;
    status: string;
    years: string;
    recordBook: string;
    studyForm: string;
    basis: string;
    faculty: string;
    direction: string;
    profile: string;
    course: string;
    group: string;
}

interface WorkItem {
    positionName: string;
    rate: string;
    employmentType: string;
    workPlace: string;
    department: string;
    positionType: string;
    direction?: string;
    startDate: string;
    endDate: string;
    totalExperience?: string;
    pedagogyExperience?: string;
    currentWorkExperience?: string;
}

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