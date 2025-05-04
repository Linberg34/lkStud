import { useDispatch, useSelector } from 'react-redux'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { MiniAvatarComponent } from '../../../shared/ui/mini-avatar/mini-avatar.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import './admin-page.component.css'
import type { RootState, AppDispatch } from "../../../store/store"
import { useEffect } from 'react'
import { fetchProfile } from '../../../store/slices/profileSlice'
import { useAvatarUrl } from '../../../shared/hooks/useAvatar'
import { AdminCardComponent } from '../../../shared/ui/admin-card/admin-card.component'

export const AdminPageComponent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { profile } = useSelector((s: RootState) => s.profile)
    const fileId = profile?.avatar?.id
    const { url: avatarUrl } = useAvatarUrl(fileId);


    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    return (
        <div className="admin-page-component">
            <MenuComponent />
            <div className="admin-page-component__wrapper">
                <div className="admin-page-component__header">
                    <HeaderComponent title='Администрирование' />
                    <MiniAvatarComponent  src={avatarUrl}/>
                </div>
                <NavigationComponent />
                <div className="admin-page-component__content">
                    <AdminCardComponent
                    iconSrc='/assets/svg/menu/black/User.svg'
                    title='Пользователи'
                    description='В этом блоке вы сможете управлять пользователями'
                    link='/admin/users'
                    />
                    <AdminCardComponent
                    iconSrc='/assets/svg/menu/black/Links.svg'
                    title='Полезные сервисы'
                    description='В этом блоке вы сможете управлять полезными сервисами'
                    link='/admin/usefulservices'
                    />
                    <AdminCardComponent
                    iconSrc='/assets/svg/menu/black/Map.svg'
                    title='Мероприятия'
                    description='В этом блоке вы сможете управлять мероприятиями'
                    link='/admin/events'
                    />
                </div>
            </div>
        </div>
    )
}