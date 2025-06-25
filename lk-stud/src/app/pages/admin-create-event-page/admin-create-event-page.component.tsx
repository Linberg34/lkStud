import { useEffect, useState } from 'react';
import { HeaderComponent } from '../../../shared/ui/header/header.component';
import { MenuComponent } from '../../../shared/ui/menu/menu.component';
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component';
import './admin-create-event-page.component.css'
import { CreateEventFormComponent } from '../../../shared/ui/create-event-form/create-event-form.component';
import { EventCreateDto } from '../../api/models/Events';


export const AdminCreateEventPageComponent = () => {
    const [isWide, setIsWide] = useState(window.innerWidth > 1200)

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const handleSave = (data: EventCreateDto) => {
        console.log('CreateEventForm submitted:', data)
    }
    
    return (
        <div className="admin-create-event-page">
            {isWide && <MenuComponent />}
            <div className="admin-event-page-component__wrapper">
                <HeaderComponent title="Администрирование" />
                <NavigationComponent />

                <div className="admin-event-page-component__body">
                    <CreateEventFormComponent
                        mode="add"
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}