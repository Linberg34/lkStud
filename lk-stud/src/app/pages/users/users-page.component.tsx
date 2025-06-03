import "./users-page.component.css"
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
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations"
import { Link } from "react-router-dom"



export const UsersPageComponent: React.FC = () => {

    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    const dispatch = useDispatch<AppDispatch>()
    const [users, setUsers] = useState<ProfileShortDtoPagedListWithMetadata["results"]>([])
    const [meta, setMeta] = useState<ProfileShortDtoPagedListWithMetadata["metaData"] | null>(null)
    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const t = usePageTranslations('users');
    const pageSize = 20

    const [currentLetter, setCurrentLetter] = useState<string>("")
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const [view, setView] = useState<"list" | "grid">("list")

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        dispatch(fetchUsersList({ page, pageSize, name: searchQuery }))
            .then(res => {
                if (fetchUsersList.fulfilled.match(res)) {
                    setUsers(res.payload.results)
                    setMeta(res.payload.metaData)
                }
            })
    }, [dispatch, page, pageSize, searchQuery])

    const filtered = useMemo(() => {
        if (!currentLetter) return users
        return users.filter(u => u.lastName?.startsWith(currentLetter))
    }, [users, currentLetter])

    return (
        <div className="users-page-component">
            {isWide &&<MenuComponent />}
            <div className="users-page-component__content">
                <HeaderComponent title={t.users} />
                <h1 className="users-page-component__page-title">{t.users}</h1>
                <NavigationComponent />
                <SearchComponent
                    placeholder={t.hint}
                    buttonText={t.search}
                    onSearch={(query: string) => {
                        setPage(1)
                        setSearchQuery(query.trim())
                    }}

                />

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
                        <Link
                            key={user.id}
                            to={`/admin/users/${user.id}`}
                            className="users-page-component__card-link"
                        >
                            <UserCardComponent
                                key={user.id}
                                name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                                birthday={user.birthDate}
                                email={user.email}
                                viewMode={view}
                            />
                        </Link>

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
