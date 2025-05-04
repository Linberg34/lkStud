import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import './admin-page.component.css'



export const AdminPageComponent = () => {
    return (
        <div className="admin-page-component">
            <MenuComponent />

            <div className="admin-page-component__wrapper">
                <div className="admin-page-component__header">
                    <HeaderComponent title='Администрирование' />
                </div>
                <NavigationComponent />
                <div className="admin-page-component__content">

                </div>
            </div>
        </div>
    )
}