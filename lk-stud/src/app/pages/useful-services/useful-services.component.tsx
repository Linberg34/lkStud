import  { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HeaderComponent } from "../../../shared/ui/header/header.component"
import { MenuComponent } from "../../../shared/ui/menu/menu.component"
import "./useful-services.component.css"
import {
    UsefulServiceDtoPagedListWithMetadata,
    UsefulServiceCategory,
} from "../../api/models/useful-services"
import { getUsefulServices } from "../../api/services/usefulService-service"
import { ServiceCard } from "../../../shared/ui/service-card/service-card.component"
import { AppDispatch, RootState } from "../../../store/store"
import {
    fetchProfile,
    fetchStudentProfile,
    fetchEmployeeProfile,
} from "../../../store/slices/profileSlice"
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component"
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component"
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations"

const CATEGORIES = {
    FOR_ALL: "ForAll",
    STUDENTS: "Students",
    EMPLOYEES: "Employees"
} as const

type CategoryValue = UsefulServiceCategory

export const UsefulServicesComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const t = usePageTranslations("usefulServices")
    const { profile, status: profileStatus } = useSelector(
        (st: RootState) => st.profile
    )
    const [items, setItems] = useState<
        UsefulServiceDtoPagedListWithMetadata["results"]
    >([])
    const [meta, setMeta] =
        useState<UsefulServiceDtoPagedListWithMetadata["metaData"] | null>(null)
    const [page, setPage] = useState(1)
    const pageSize = 3

    useEffect(() => {
        dispatch(fetchProfile())
    }, [dispatch])

    useEffect(() => {
        if (profile?.userTypes.includes("Student")) {
            dispatch(fetchStudentProfile())
        }
        if (profile?.userTypes.includes("Employee")) {
            dispatch(fetchEmployeeProfile())
        }
    }, [dispatch, profile])

    const categories = useMemo<CategoryValue[]>(() => {
        const cats: CategoryValue[] = [CATEGORIES.FOR_ALL as CategoryValue]

        if (profile?.userTypes.includes("Student")) {
            cats.push(CATEGORIES.STUDENTS as CategoryValue)
        }
        if (profile?.userTypes.includes("Employee")) {
            cats.push(CATEGORIES.EMPLOYEES as CategoryValue)
        }

        return cats
    }, [profile?.userTypes])

    useEffect(() => {
        if (profileStatus !== "succeeded") return

        getUsefulServices({
            page,
            pageSize,
            categories,
        })
            .then((res) => {
                setItems(res.results)
                setMeta(res.metaData)
            })
            .catch((err) => console.error(err))
    }, [page, pageSize, profileStatus, categories])

    const [isWide, setIsWide] = useState(window.innerWidth > 1200)
    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    return (
        <div className="useful-services-component">
            {isWide && <MenuComponent />}
            <div className="useful-services-component__wrapper">
                <HeaderComponent title={t.title} />
                <h1 className="useful-services-component__page-title">{t.title}</h1>
                <NavigationComponent />
                <div className="useful-services-component__content">
                    {items.map((s) => (
                        <ServiceCard
                            key={s.id}
                            title={s.title}
                            description={s.description || ""}
                            link={s.link || ""}
                            termsOfDisсtribution={s.termsOfDisctribution || ""}
                            logoId={s.logo?.id}
                        />
                    ))}
                </div>
                {meta && meta.pageCount > 1 && (
                    <div className="useful-services-component__pagination">
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