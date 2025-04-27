import React from "react"
import "./button.component.css"

interface ButtonProps {
	children: React.ReactNode
	type?: "primary" | "outlined"
	disabled?: boolean
	onClick?: () => void
	iconSrc?: string
	iconPosition?: "start" | "end"
}

const buttonClassNameBase = "button-component"

export const ButtonComponent: React.FC<ButtonProps> = ({
	children,
	type = "primary",
	disabled = false,
	onClick,
	iconSrc,
	iconPosition = "end",
}) => {
	const classNames = [buttonClassNameBase]

	if (type === "primary") classNames.push(`${buttonClassNameBase}_primary`)
	if (type === "outlined") classNames.push(`${buttonClassNameBase}_outlined`)
	if (disabled) classNames.push(`${buttonClassNameBase}_disabled`)

	return (
		<button
			type="button"
			className={classNames.join(" ")}
			disabled={disabled}
			onClick={onClick}
		>
			<span className="button-component__content">
				{iconSrc && iconPosition === "start" && (
					<img
						src={iconSrc}
						alt=""
						className="button-component__icon"
					/>
				)}
				<span className="button-component__text">
					{children}
				</span>
				{iconSrc && iconPosition === "end" && (
					<img
						src={iconSrc}
						alt=""
						className="button-component__icon"
					/>
				)}
			</span>
		</button>
	)
}
