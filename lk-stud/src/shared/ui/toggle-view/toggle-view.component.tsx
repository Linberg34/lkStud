import React from "react"
import "./toggle-view.component.css"

export interface ViewToggleProps {
    view: "list" | "grid"
    onViewChange: (view: "list" | "grid") => void
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
    const icons = {
        list: {
            active: "/assets/svg/interface/blue/Hamburger.svg",
            inactive: "/assets/svg/interface/black/Hamburger.svg",
        },
        grid: {
            active: "/assets/svg/interface/blue/More_Grid.svg",
            inactive: "/assets/svg/interface/black/More_Grid.svg",
        },
    }

    return (
        <div className="view-toggle">
            <button
                className={`view-toggle__btn ${view === "list" ? "active" : ""}`}
                onClick={() => onViewChange("list")}
            >
                <img
                    src={view === "list" ? icons.list.active : icons.list.inactive}
                />
            </button>
            <button
                className={`view-toggle__btn ${view === "grid" ? "active" : ""}`}
                onClick={() => onViewChange("grid")}
            >
                <img
                    src={view === "grid" ? icons.grid.active : icons.grid.inactive}
                />
            </button>
        </div>
    )
}
