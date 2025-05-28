import React from "react";
import "./pagination.component.css";

const DOTS = "...";

interface PaginationProps {
    count: number;
    page: number;
    onChange: (page: number) => void;
    siblingCount?: number;
    showFirstButton?: boolean;
    showLastButton?: boolean;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
    count,
    page,
    onChange,
    siblingCount = 1,
}) => {
    const paginationRange = React.useMemo<(number | string)[]>(() => {
        
        if (count <= 5) {
            return Array.from({ length: count }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];

        if (page <= 3) {
            for (let i = 1; i <= 4; i++) {
                pages.push(i);
            }
            pages.push(DOTS);
            pages.push(count);
        }
        else if (page >= count - 2) {
            pages.push(1);
            pages.push(DOTS);
            for (let i = count - 3; i <= count; i++) {
                pages.push(i);
            }
        }
        else {
            const distanceFromStart = page - 1;
            const distanceFromEnd = count - page;

            if (distanceFromStart <= distanceFromEnd) {
                for (let i = 1; i <= page + siblingCount; i++) {
                    pages.push(i);
                }
                pages.push(DOTS);
                pages.push(count);
            } else {
                pages.push(1);
                pages.push(DOTS);
                for (let i = page - siblingCount; i <= count; i++) {
                    pages.push(i);
                }
            }
        }

        return pages;
    }, [page, count, siblingCount]);

    if (count < 2) {
        return null;
    }

    return (
        <nav className="pagination">
            <button
                className="pagination__button"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
            >
                <img src="/assets/svg/Arrow/black/Chevron_Left_MD.svg" alt="Previous" />
            </button>

            {paginationRange.map((pageNumber, idx) => {
                if (pageNumber === DOTS) {
                    return (
                        <span key={`dots-${idx}`} className="pagination__dots">
                            {DOTS}
                        </span>
                    );
                }

                return (
                    <button
                        key={pageNumber}
                        className={
                            pageNumber === page
                                ? "pagination__button pagination__button--active"
                                : "pagination__button"
                        }
                        onClick={() => onChange(pageNumber as number)}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                className="pagination__button"
                onClick={() => onChange(page + 1)}
                disabled={page === count}
            >
                <img src="/assets/svg/Arrow/black/Chevron_Right_MD.svg" alt="Next" />
            </button>
        </nav>
    );
};