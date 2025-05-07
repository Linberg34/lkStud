import React from "react"
import "./alphabet.component.css"

const RUSSIAN_ALPHABET = [
    "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й",
    "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф",
    "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я",
]

type ViewMode = "list" | "grid"

interface AlphabetComponentProps {
    current: string
    onSelect: (letter: string) => void
    onPrev: () => void
    onNext: () => void
    view: ViewMode
    onViewChange: (view: ViewMode) => void
}

export const AlphabetComponent: React.FC<AlphabetComponentProps> = ({
    current, onSelect, onPrev, onNext, view, onViewChange
}) => {
    // const iconSrc = (name: string, isActive: boolean) =>
    //     `/assets/svg/menu/${name}/${isActive ? "blue" : "black"}/${name === "Hamburger" ? "Hamburger" : "More_Grid"}.svg`

    return (
        <div className="alphabet-navigator">
            <button className="arrow-btn" onClick={onPrev}>&lt;</button>
            <div className="letters">
                {RUSSIAN_ALPHABET.map(letter => (
                    <button
                        key={letter}
                        className={`letter-btn${letter === current ? " active" : ""}`}
                        onClick={() => onSelect(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <button className="arrow-btn" onClick={onNext}>&gt;</button>

            <div className="view-toggle">
                <button
                    className={view === "list" ? "active" : ""}
                    onClick={() => onViewChange("list")}
                >
                    <img
                        src="/assets/svg/menu/black/Hamburger.svg"
                    />
                </button>
                <button
                    className={view === "grid" ? "active" : ""}
                    onClick={() => onViewChange("grid")}
                >
                    <img
                        src="/assets/svg/interface/black/More_Grid.svg"
                    />
                </button>
            </div>
        </div>
    )
}

