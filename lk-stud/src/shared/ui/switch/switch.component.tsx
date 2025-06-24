
import "./switch.component.css";

interface SwitchProps {
	checked?: boolean; 
	disabled?: boolean; 
	onChange?: (checked: boolean) => void; 
}

const switchClassNameBase = "switch-component";

export const SwitchComponent: React.FC<SwitchProps> = ({
	checked = false,
	disabled = false,
	onChange,
}) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event.target.checked);
		}
	};

	const switchClassName = () => {
		const names: string[] = [switchClassNameBase];

		if (checked) names.push(`${switchClassNameBase}_checked`);
		if (disabled) names.push(`${switchClassNameBase}_disabled`);

		return names.join(" ");
	};

	return (
		<label className={switchClassName()}>
			<input
				type="checkbox"
				checked={checked}
				disabled={disabled}
				onChange={handleChange}
				className={`${switchClassNameBase}__input`}
			/>
			<span className={`${switchClassNameBase}__slider`} />
		</label>
	);
};