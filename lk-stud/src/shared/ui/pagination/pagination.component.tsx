import React from "react";
import "./pagination.component.css";

const DOTS = "...";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; 
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}) => {
    const paginationRange = React.useMemo<(number | string)[]>(() => {
        const totalPageNumbers = siblingCount * 2 + 5;
        if (totalPages <= totalPageNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPages - 1;

        const pages: (number | string)[] = [];

        pages.push(1);

        if (showLeftDots) {
            pages.push(DOTS);
        }

        for (let page = leftSiblingIndex; page <= rightSiblingIndex; page++) {
            pages.push(page);
        }

        if (showRightDots) {
            pages.push(DOTS);
        }

        pages.push(totalPages);

        return pages;
    }, [currentPage, totalPages, siblingCount]);

    if (totalPages < 2) {
        return null;
    }

    return (
        <nav className="pagination">
            <button
                className="pagination__button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {paginationRange.map((page, idx) => {
                if (page === DOTS) {
                    return (
                        <span key={`dots-${idx}`} className="pagination__dots">
                            {DOTS}
                        </span>
                    );
                }

                return (
                    <button
                        key={page}
                        className={
                            page === currentPage
                                ? "pagination__button pagination__button--active"
                                : "pagination__button"
                        }
                        onClick={() => onPageChange(page as number)}
                    >
                        {page}
                    </button>
                );
            })}

            <button
                className="pagination__button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </nav>
    );
};
