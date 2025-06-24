
import "./user-card.component.css"

interface UserCardComponentProps {
    name: string
    birthday?: string
    email?: string
    viewMode?: "list" | "grid"
    
}

export const UserCardComponent: React.FC<UserCardComponentProps> = ({
    name,
    birthday,
    email,
    viewMode = "list",
}) => (
    <div className={`user-card-component ${viewMode}`}>
        <div className="user-card-component__content">
            <span className="p1 user-card-component__name">{name}</span>
            <div className="user-card-text__wrapper">
                <span className="p2 user-card-component__label">Дата рождения:</span>
                <span className="p2 user-card-component__birthday">{birthday || ""}</span>
            </div>
            <div className="user-card-text__wrapper">
                <span className="p2 user-card-component__label">Email:</span>
                <span className="p2 user-card-component__email">{email || "—"}</span>
            </div>
        </div>
    </div>
)
