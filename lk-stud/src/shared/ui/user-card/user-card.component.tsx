import './user-card.component.css'

interface UserCardComponentProps {
    name: string,
    birthday?: Date,
    email?: string
}


export const UserCardComponent: React.FC<UserCardComponentProps> = ({
    name,
    birthday,
    email
}) => {
    return (
        <div className="user-card-component">
            <div className="user-card-component__content">
                <span className='p1 user-card-component__name'>{name}</span>
                <span className='p2 user-card-component__birthday'>Дата рождения: {birthday ? birthday.toISOString().split('T')[0] : ''}</span>
                <span className='p2 user-card-component__email'>Email: {email}</span>
            </div>
        </div>
    )
}