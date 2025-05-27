import React, { useState, useEffect } from "react";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component";
import { AdminUsefulServicesCard } from "../../../shared/ui/admin-usefulService-card/admin-usefulService-card.component";
import { getUsefulServices } from "../../api/services/usefulService-service";
import {
    UsefulServiceDtoPagedListWithMetadata,
} from "../../api/models/useful-services";
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations";
import "./admin-usefulServices.component.css";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { UsefulServiceAddForm } from "../../../shared/ui/useful-service-add-form/useful-service-add-form.component";

export const AdminUsefulServicesComponent: React.FC = () => {
    const t = usePageTranslations("usefulServices");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState<UsefulServiceDtoPagedListWithMetadata["results"]>([]);
    const [meta, setMeta] = useState<UsefulServiceDtoPagedListWithMetadata["metaData"] | null>(null);

    const [page, setPage] = useState(1);
    const pageSize = 2;

    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getUsefulServices({ page, pageSize, categories: [] })
            .then(res => {
                setItems(res.results);
                setMeta(res.metaData);
            })
            .catch(console.error);
    }, [page]);

    const handleEdit = (id: string) => {
        console.log("edit", id);
    };
    const handleDelete = (id: string) => {
        console.log("delete", id);
    };

    return (
        <div className="admin-useful-services">
            {isWide && <MenuComponent />}
            <UsefulServiceAddForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
            <div className="admin-useful-services__wrapper">
                <HeaderComponent title={t.title} />
                <NavigationComponent />
                <div className="admin-useful-services__button">
                    <ButtonComponent
                        type="outlined"
                        iconSrc="/assets/svg/interface/red/Add.svg"
                        hoverIconSrc="/assets/svg/interface/white/Add.svg"
                        onClick={handleOpenModal}
                    >
                        Добавить сервис
                    </ButtonComponent>
                </div>

                <div className="admin-useful-services__content">


                    {items.map(svc => (
                        <AdminUsefulServicesCard
                            key={svc.id}
                            title={svc.title}
                            description={svc.description!}
                            link={svc.link!}
                            termsOfDistribution={svc.termsOfDisctribution!}
                            logoId={svc.logo?.id}
                            type={svc.category as unknown as string}
                            onEdit={() => handleEdit(svc.id)}
                            onDelete={() => handleDelete(svc.id)}
                        />
                    ))}
                </div>

                {meta && meta.pageCount > 0 && (
                    <div className="admin-useful-services__pagination">
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
    );
};
