import React, { useState, useEffect } from "react";
import { HeaderComponent } from "../../../shared/ui/header/header.component";
import { MenuComponent } from "../../../shared/ui/menu/menu.component";
import { NavigationComponent } from "../../../shared/ui/navigation/navigation.component";
import { PaginationComponent } from "../../../shared/ui/pagination/pagination.component";
import { AdminUsefulServicesCard } from "../../../shared/ui/admin-usefulService-card/admin-usefulService-card.component";
import {
    getUsefulServices,
    createUsefulService,
    updateUsefulService,
    deleteUsefulService
} from "../../api/services/usefulService-service";
import {
    UsefulServiceCategory,
    UsefulServiceDtoPagedListWithMetadata,
    UsefulServiceEditCreateDto
} from "../../api/models/useful-services";
import { usePageTranslations } from "../../../shared/hooks/usePageTranslations";
import "./admin-usefulServices.component.css";
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { UsefulServiceAddForm } from "../../../shared/ui/useful-service-add-form/useful-service-add-form.component";



export const AdminUsefulServicesComponent: React.FC = () => {
    const t = usePageTranslations("usefulServices");
    const [items, setItems] = useState<UsefulServiceDtoPagedListWithMetadata["results"]>([]);
    const [meta, setMeta] = useState<UsefulServiceDtoPagedListWithMetadata["metaData"] | null>(null);
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const [isWide, setIsWide] = useState(window.innerWidth > 1200);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [currentItem, setCurrentItem] = useState<UsefulServiceEditCreateDto & { id?: string } | null>(null);

    useEffect(() => {
        const onResize = () => setIsWide(window.innerWidth > 1200);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        loadPage();
    }, [page]);

    const loadPage = async () => {
        const res = await getUsefulServices({ page, pageSize, categories: ["ForAll", "Employees", "Students"] });
        setItems(res.results);
        setMeta(res.metaData);
    };

    const handleCreate = () => {
        setModalMode("add");
        setCurrentItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (id: string) => {
        const svc = items.find(i => i.id === id);
        if (!svc) return;
        setModalMode("edit");
        setCurrentItem({
            id: svc.id,
            title: svc.title,
            link: svc.link!,
            category: svc.category as UsefulServiceCategory,
            description: svc.description || "",
            termsOfDisctribution: svc.termsOfDisctribution || "",
            logoId: svc.logo?.id || ""
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Точно удалить?")) return;
        await deleteUsefulService(id);
        loadPage();
    };

    const handleSave = async (data: UsefulServiceEditCreateDto) => {
        if (modalMode === "add") {
            await createUsefulService(data);
        } else if (modalMode === "edit" && currentItem) {
            await updateUsefulService(currentItem.id!, data);
        }
        setIsModalOpen(false);
        loadPage();
    };
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setCurrentItem(null);
        setModalMode("add");
    };

    return (
        <div className="admin-useful-services">
            {isWide && <MenuComponent />}
            <UsefulServiceAddForm
                t={t}
                isOpen={isModalOpen}
                onClose={handleClose}
                mode={modalMode}
                initialData={currentItem}
                onSave={handleSave}
            />
            <div className="admin-useful-services__wrapper">
                <HeaderComponent title={t.title} />
                <NavigationComponent />
                <div className="admin-useful-services__button">
                    <ButtonComponent
                        type="outlined"
                        iconSrc="/assets/svg/interface/red/Add.svg"
                        hoverIconSrc="/assets/svg/interface/white/Add.svg"
                        onClick={handleCreate}
                    >
                        {t.buttonText}
                    </ButtonComponent>
                </div>
                <div className="admin-useful-services__content">
                    {items.map(svc => (
                        <AdminUsefulServicesCard
                            t={t}
                            key={svc.id}
                            title={svc.title}
                            description={svc.description!}
                            link={svc.link!}
                            termsOfDistribution={svc.termsOfDisctribution!}
                            logoId={svc.logo?.id}
                            type={svc.category as string}
                            onEdit={() => handleEdit(svc.id)}
                            onDelete={() => handleDelete(svc.id)}
                        />
                    ))}
                </div>
                {meta && meta.pageCount > 1 && (
                    <div className="admin-useful-services__pagination">
                        <PaginationComponent
                            count={meta.pageCount}
                            page={page}
                            onChange={handlePageChange}
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
