import "./checkbox.component.css";

interface CheckboxProps {
	disabled?: boolean
}

const checkboxClassNameBase = "checkbox-component";

export const CheckboxComponent: React.FC<CheckboxProps> = ({
	disabled = false
}) => {

	const checkboxClassName = () => {
		const names: string[] = [checkboxClassNameBase];

		if(disabled) names.push(checkboxClassNameBase + "_disabled");

		return names.join(" ");
	}
	
	return (
		<label className={checkboxClassName()}>
			<input
				className="checkbox-component__input"
				type="checkbox"
				disabled={disabled}
				aria-label="checkbox"
			/>
			<span className="checkbox-component__view"/>
		</label>
	)
}