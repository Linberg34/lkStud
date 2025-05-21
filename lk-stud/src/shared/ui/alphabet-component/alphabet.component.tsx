import React from "react"
import "./alphabet.component.css"

const RUSSIAN_ALPHABET = [
    "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й",
    "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф",
    "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я",
]

interface AlphabetComponentProps {
    current: string
    onSelect: (letter: string) => void
    collapsed: boolean
    onCollapse: () => void
    onExpand: () => void
}

export const AlphabetComponent: React.FC<AlphabetComponentProps> = ({
    current,
    onSelect,
    collapsed,
    onCollapse,
    onExpand,
}) => {
    return (
        <div className={`alphabet-navigator ${collapsed ? "collapsed" : ""}`}>
            <button className="arrow-btn" onClick={onCollapse}>
                <img src="/assets/svg/Arrow/black/Chevron_Left.svg" alt="Collapse" />
            </button>

            {collapsed ? (
                <div className="letters-collapsed">
                    <button
                        className={`letter-btn${RUSSIAN_ALPHABET[0] === current ? " active" : ""}`}
                        onClick={() => onSelect(RUSSIAN_ALPHABET[0])}
                    >
                        {RUSSIAN_ALPHABET[0]}
                    </button>
                    <span className="letters-collapsed__sep">–</span>
                    <button
                        className={`letter-btn${RUSSIAN_ALPHABET.at(-1)! === current ? " active" : ""}`}
                        onClick={() => onSelect(RUSSIAN_ALPHABET.at(-1)!)}
                    >
                        {RUSSIAN_ALPHABET.at(-1)!}
                    </button>
                </div>
            ) : (
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
            )}

            <button className="arrow-btn" onClick={onExpand}>
                <img src="/assets/svg/Arrow/black/Chevron_Right.svg" alt="Expand" />
            </button>
        </div>
    )
}
