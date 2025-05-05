import { useDispatch } from 'react-redux'
import { MenuComponent } from '../../../shared/ui/menu/menu.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import './users-page.component.css'
import { AppDispatch } from '../../../store/store'
import { useEffect, useState } from 'react'
import { ProfileShortDtoPagedListWithMetadata } from '../../api/models/profile'
import { fetchUsersList } from '../../../store/slices/usersSlice'
import { HeaderComponent } from '../../../shared/ui/header/header.component'
import { NavigationComponent } from '../../../shared/ui/navigation/navigation.component'
import { UserCardComponent } from '../../../shared/ui/user-card/user-card.component'

export const UsersPageComponent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [users, setUsers] = useState<ProfileShortDtoPagedListWithMetadata["results"]>([])
    const [meta, setMeta] = useState<
        ProfileShortDtoPagedListWithMetadata["metaData"] | null>(null)
    const [page, setPage] = useState(1)
    const pageSize = 20


    useEffect(() => {
        dispatch(fetchUsersList({ page, pageSize }))
            .then(res => {
                if (fetchUsersList.fulfilled.match(res)) {
                    setUsers(res.payload.results)
                    setMeta(res.payload.metaData)
                } else {
                    throw res.error
                }
            })
    }, [dispatch, page, pageSize])


    return (
        <div className="users-page-component">
            <MenuComponent />
            <div className="users-page-component__content">
                <HeaderComponent title="Пользователи" />
                <NavigationComponent />
                <div className="users-page-component__cards">
                    {users.map((user) => (
                        <UserCardComponent
                            key={user.id}
                            name={user.lastName + ' ' + user.firstName + ' ' + user.patronymic}
                            birthday={user.birthDate}
                            email={user.email}
                        />
                    ))}
                </div>
                {meta && meta.pageCount > 1 && (
                    <div className="users-page-component__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={(newPage) => setPage(newPage)}
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}