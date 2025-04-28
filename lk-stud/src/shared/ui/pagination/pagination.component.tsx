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
    showFirstButton = false,
    showLastButton = false,
}) => {
    const paginationRange = React.useMemo<(number | string)[]>(() => {
        const totalPageNumbers = siblingCount * 2 + 5;
        if (count <= totalPageNumbers) {
            return Array.from({ length: count }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, count);

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < count - 1;

        const pages: (number | string)[] = [];

        if (showFirstButton || !showLeftDots) {
            pages.push(1);
        }

        if (showLeftDots) {
            pages.push(DOTS);
        }

        for (let p = leftSiblingIndex; p <= rightSiblingIndex; p++) {
            pages.push(p);
        }

        if (showRightDots) {
            pages.push(DOTS);
        }

        if (showLastButton || !showRightDots) {
            pages.push(count);
        }

        return pages;
    }, [page, count, siblingCount, showFirstButton, showLastButton]);

    if (count < 2) {
        return null;
    }

    return (
        <nav className="pagination">
            {showFirstButton && (
                <button
                    className="pagination__button"
                    onClick={() => onChange(1)}
                    disabled={page === 1}
                >
                    &laquo;
                </button>
            )}

            <button
                className="pagination__button"
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
            >
                &lt;
            </button>

            {paginationRange.map((p, idx) => {
                if (p === DOTS) {
                    return (
                        <span key={`dots-${idx}`} className="pagination__dots">
                            {DOTS}
                        </span>
                    );
                }

                return (
                    <button
                        key={p}
                        className={
                            p === page
                                ? "pagination__button pagination__button--active"
                                : "pagination__button"
                        }
                        onClick={() => onChange(p as number)}
                    >
                        {p}
                    </button>
                );
            })}

            <button
                className="pagination__button"
                onClick={() => onChange(page + 1)}
                disabled={page === count}
            >
                &gt;
            </button>

            {showLastButton && (
                <button
                    className="pagination__button"
                    onClick={() => onChange(count)}
                    disabled={page === count}
                >
                    &raquo;
                </button>
            )}
        </nav>
    );
};