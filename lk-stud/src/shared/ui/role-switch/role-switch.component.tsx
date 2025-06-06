import { useEffect, useState } from "react";
import "./role-switch.component.css";
import { SelectComponent } from "../input-text/select.component";

interface RoleSwitchComponentProps {
    role?: string;
    onRoleChange?: (role: string) => void;
}

export const RoleSwitchComponent: React.FC<RoleSwitchComponentProps> = ({
    role,
    onRoleChange,
}) => {
    const [isMobile, setMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => setMobile(window.innerWidth < 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="role-switch-component">
            {!isMobile && (
                <>
                    <span
                        className={`role-switch-component__role ${role === 'Student' ? 'active' : ''}`}
                        onClick={() => onRoleChange && onRoleChange('Student')}
                    >
                        Студент
                    </span>
                    <span
                        className={`role-switch-component__role ${role === 'Employee' ? 'active' : ''}`}
                        onClick={() => onRoleChange && onRoleChange('Employee')}
                    >
                        Сотрудник
                    </span>
                </>
            )}
            {isMobile && (
                <SelectComponent
                    iconSrc="/assets/svg/Arrow/red/Chevron_Down.svg"

                    label="Роль"
                    name="role"
                    value={role || ""}
                    onChange={(event) => onRoleChange && onRoleChange(event.target.value)}
                    options={[
                        { value: "Студент", label: "Студент" },
                        { value: "Сотрудник", label: "Сотрудник" },
                    ]}
                    placeholder=""
                />
            )}
        </div>
    );
};