import React, { useEffect, useState, useMemo } from "react"
import { useDispatch } from "react-redux"
import { MenuComponent } from "../../../shared/ui/menu/menu.component"
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component"
import { HeaderComponent } from "../../../shared/ui/header/header.component"
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component"
import { SearchComponent } from "../../../shared/ui/search/search.component"
import { UserCardComponent } from "../../../shared/ui/user-card/user-card.component"
import { AlphabetComponent } from "../../../shared/ui/alphabet-component/alphabet.component"
import { ViewToggle } from "../../../shared/ui/toggle-view/toggle-view.component"
import { AppDispatch } from "../../../store/store"
import { fetchUsersList } from "../../../store/slices/usersSlice"
import type { ProfileShortDtoPagedListWithMetadata } from "../../api/models/profile"
import "./users-page.component.css"


export const UsersPageComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [users, setUsers] = useState<ProfileShortDtoPagedListWithMetadata["results"]>([])
    const [meta, setMeta] = useState<ProfileShortDtoPagedListWithMetadata["metaData"] | null>(null)
    const [page, setPage] = useState(1)
    const pageSize = 20

    const [currentLetter, setCurrentLetter] = useState<string>("")
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const [view, setView] = useState<"list" | "grid">("list")

    useEffect(() => {
        dispatch(fetchUsersList({ page, pageSize }))
            .then(res => {
                if (fetchUsersList.fulfilled.match(res)) {
                    setUsers(res.payload.results)
                    setMeta(res.payload.metaData)
                }
            })
    }, [dispatch, page, pageSize])

    const filtered = useMemo(() => {
        if (!currentLetter) return users
        return users.filter(u => u.lastName?.startsWith(currentLetter))
    }, [users, currentLetter])

    return (
        <div className="users-page-component">
            <MenuComponent />
            <div className="users-page-component__content">
                <HeaderComponent title="Пользователи" />
                <NavigationComponent />
                <SearchComponent />

                <div className="users-page-component__header-block">
                    <AlphabetComponent
                        current={currentLetter}
                        onSelect={setCurrentLetter}
                        collapsed={collapsed}
                        onCollapse={() => setCollapsed(true)}
                        onExpand={() => setCollapsed(false)}
                    />
                    <ViewToggle view={view} onViewChange={setView} />
                </div>

                <div className={`users-page-component__cards view-${view}`}>
                    {filtered.map(user => (
                        <UserCardComponent
                            key={user.id}
                            name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                            birthday={user.birthDate}
                            email={user.email}
                            viewMode={view}
                        />
                    ))}
                </div>

                {meta && meta.pageCount > 1 && (
                    <div className="users-page-component__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={setPage}
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
