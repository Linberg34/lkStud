import  { useState } from "react"
import "./button.component.css"

interface ButtonProps {
	children: React.ReactNode
	type?: "primary" | "outlined"
	disabled?: boolean
	onClick?: () => void
	iconSrc?: string
	hoverIconSrc?: string
	iconPosition?: "start" | "end"
}

const buttonClassNameBase = "button-component"

export const ButtonComponent: React.FC<ButtonProps> = ({
	children,
	type = "primary",
	disabled = false,
	onClick,
	iconSrc,
	hoverIconSrc,
	iconPosition = "end",
}) => {
	const [isHovered, setIsHovered] = useState(false)

	const classNames = [buttonClassNameBase]
	if (type === "primary") classNames.push(`${buttonClassNameBase}_primary`)
	if (type === "outlined") classNames.push(`${buttonClassNameBase}_outlined`)
	if (disabled) classNames.push(`${buttonClassNameBase}_disabled`)

	const currentIcon = () => {
		if (!iconSrc) return undefined
		if (isHovered && hoverIconSrc) {
			return hoverIconSrc
		}
		return iconSrc
	}

	return (
		<button
			type="button"
			className={classNames.join(" ")}
			disabled={disabled}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<span className="button-component__content">
				{currentIcon() && iconPosition === "start" && (
					<img
						src={currentIcon()}
						alt=""
						className="button-component__icon"
					/>
				)}
				<span className="button-component__text">{children}</span>
				{currentIcon() && iconPosition === "end" && (
					<img
						src={currentIcon()}
						alt=""
						className="button-component__icon"
					/>
				)}
			</span>
		</button>
	)
}
