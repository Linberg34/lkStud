import './admin-profile-page.component.css'
import { useParams } from 'react-router-dom'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { useEffect, useState } from 'react'
import { PersonalDataItem, ProfilePersonalDataComponent } from '../../../shared/ui/profile-personal-data/profile-personal-data.component'
import { getUser } from '../../api/services/user-service'
import { Profile } from '../../api/models/profile'
import { useAvatarUrl } from '../../../shared/hooks/useAvatar'

export const AdminProfilePageComponent: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<Profile | null>(null)
    const [isWide, setIsWide] = useState(window.innerWidth > 1201)
    const fileId = user?.avatar?.id
    const { url: avatarUrl } = useAvatarUrl(fileId)
    const fullName = user ? `${user.lastName} ${user.firstName} ${user.patronymic}` : '';

    const triggerAdminMenu = () => {

    }

    useEffect(() => {
        window.addEventListener('resize', () => setIsWide(window.innerWidth > 1201))
        return () => window.removeEventListener('resize', () => { })
    }, [])

    useEffect(() => {
        if (!id) return
        getUser(id).then(u => setUser(u))
    }, [id])

    if (!user) return null

    const rawPersonalData: PersonalDataItem[] = [
        { label: 'Пол', value: user.gender },
        { label: 'Дата рождения', value: user.birthDate },
        { label: 'Гражданство', value: user.citizenship?.name },
        { label: 'Email', value: user.email },
    ];
    const rawContacts: PersonalDataItem[] = [
        { label: 'Телефон', value: user.contacts.find(c => c.type === 'Phone')?.value || '' },
        { label: 'E-mail', value: user.contacts.find(c => c.type === 'Email')?.value || '' },
        { label: 'Адрес', value: user.address },
    ];

    const personalData = rawPersonalData.filter(item => !!item.value);
    const contacts = rawContacts.filter(item => !!item.value);


    return (
        <div className="admin-profile-page-component">
            {isWide && <MenuComponent />}
            <div className="admin-profile-page-component__wrapper">
                <HeaderComponent title="Профиль" />
                <NavigationComponent
                    username={fullName}
                />
                <h2 className="admin-profile-page-component__title">
                    {user.lastName} {user.firstName} {user.patronymic}
                </h2>
                <ProfilePersonalDataComponent
                    imageSrc={avatarUrl || "/assets/imgs/US-img.jpg"}
                    personalData={personalData}
                    contacts={contacts}
                    onAvatarClick={triggerAdminMenu}
                />
            </div>
        </div>
    )
}