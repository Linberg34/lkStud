import "./input-text.component.css";

export type Option = { value: string; label: string };

interface SelectProps {
    label: string;
    name: string;
    value: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
    iconSrc?: string
}

export const SelectComponent: React.FC<SelectProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder,
    disabled = false,
    iconSrc
}) => (
    <div className="input-text-component">
        <label className="input-text-component__label">
            <span className="input-text-component__title">
                {label}
            </span>

            <span className="input-text-component__field">
                <select
                    className="input-text-component__input"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {<img
                    src={iconSrc}
                    aria-hidden="true"
                    className="input-text-component__arrow"
                />}
            </span>
        </label>
    </div>
);
