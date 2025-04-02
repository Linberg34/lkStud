import React from "react";
import "./button.component.css";

interface ButtonProps {
	children: React.ReactNode
	type?: "primary" | "outlined"
	disabled?: boolean
}

const buttonClassNameBase = "button-component";

export const ButtonComponent: React.FC<ButtonProps> = ({
	children,
	type = "primary",
	disabled = false
}) => {

	const buttonClassName = () => {
		const names: string[] = [buttonClassNameBase];

		if(type === "primary") names.push(buttonClassNameBase + "_primary");
		if(type === "outlined") names.push(buttonClassNameBase + "_outlined");
		if(disabled) names.push(buttonClassNameBase + "_disabled");

		return names.join(" ");
	}

	return (
		<button 
			className={buttonClassName()} 
			disabled={disabled}
		>
			{children}
		</button>
	)
}
