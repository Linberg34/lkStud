import React from "react";
import "./input-text.component.css";

type InputTextProps = {
	label: string,
	value: string,
	name?: string,
	onChange?: React.ChangeEventHandler<HTMLInputElement>,
	placeholder?: string,
	disabled?: boolean,

	caption?: string,
	isError?: boolean,

	leftIconSrc?: string,
	onClickLeftIcon?: React.MouseEventHandler<HTMLButtonElement>

	rightIconSrc?: string
	onClickRightIcon?: React.MouseEventHandler<HTMLButtonElement>
}

const inputTextClassNameBase = "input-text-component";

export const InputTextComponent: React.FC<InputTextProps> = ({
	label,
	value,
	name,
	onChange,
	placeholder = "placeholder",
	disabled = false,

	caption,
	isError = false,

	leftIconSrc,
	onClickLeftIcon = () => {},

	rightIconSrc,
	onClickRightIcon = () => {}
}) => {

	const inputTextClassName = () => {
		const names: string[] = [inputTextClassNameBase];

		if(disabled) names.push(inputTextClassNameBase + "_disabled");
		if(isError) names.push(inputTextClassNameBase + "_error");

		return names.join(" ");
	}

	return (
		<div className={inputTextClassName()}>
			<label className="input-text-component__label">
				<span className="input-text-component__title">
					{label}
				</span>
				<span className="input-text-component__field">
					{leftIconSrc && <button 
						className="input-text-component__icon" 
						onClick={onClickLeftIcon}
						disabled={disabled}
					>
						<img src={leftIconSrc} alt="icon"/>
					</button>}
					<input 
						className="input-text-component__input" 
						type="text"
						name={name}
						disabled={disabled}
						value={value}
						onChange={onChange}
						placeholder={placeholder}
					/>
					{rightIconSrc && <button 
						className="input-text-component__icon" 
						onClick={onClickRightIcon}
						disabled={disabled}
					>
						<img src={rightIconSrc} alt="icon"/>
					</button>}
				</span>
			</label>
			<span className="input-text-component__caption">
				{caption}
			</span>
		</div>
	)
}