import React from "react"
import { HeaderComponent } from "../../../shared/ui/header/header.component"
import { MenuComponent } from "../../../shared/ui/menu/menu.component"
import "./useful-services.component.css"
import { UsefulServiceDtoPagedListWithMetadata } from "../../api/models/useful-services"
import { useState, useEffect } from "react"
import { getUsefulServices } from "../../api/services/usefulService-service"
import { ServiceCard } from "../../../shared/ui/service-card/service-card.component"
import { Pagination } from "@mui/material"

export const UsefulServicesComponent: React.FC = () => {
    const [i, setI] = useState<UsefulServiceDtoPagedListWithMetadata["results"]>([]);
    const [meta, setMeta] = useState<UsefulServiceDtoPagedListWithMetadata["metaData"] | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        async function load() {
            try {
                const response = await getUsefulServices({ page, pageSize });
                setI(response.results);
                setMeta(response.metaData);
            } catch (err) {
                console.error("Не удалось загрузить сервисы", err);
            }
        }
        load();
    }, [page]);

    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);


    return (
        <div className="useful-services-component">
            {isWide && <MenuComponent />}
            <div className="useful-services-component__wrapper">
                <HeaderComponent title="Полезные сервисы" />
                <p className="p2 useful-services-component__navigation">
                    Главная / Полезные сервисы
                </p>

                <div className="useful-services-component__content">
                    {i.map((s) => (
                        <ServiceCard
                            category={s.category}
                            key={s.id}
                            title={s.title}
                            description={s.description!}
                            link={s.link!}
                            termsOfDisсtribution={s.termsOfDisctribution!}
                            logoId={s.logo.id}
                        />
                    ))}
                </div>

                {meta && meta.pageCount > 1 && (
                    <div className="useful-services-component__pagination">
                        <Pagination
                            count={meta.pageCount}
                            page={page}
                            onChange={(_, newPage) => setPage(newPage)}
                            showFirstButton
                            showLastButton
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
