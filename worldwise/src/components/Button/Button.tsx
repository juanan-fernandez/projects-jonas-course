import styles from './Button.module.css'

type ButtonProps = {
	children: React.ReactNode
	onClickHandler?: () => void
}

export function Button({ children, onClickHandler }: ButtonProps) {
	const onButtonClick = () => {
		if (onClickHandler) onClickHandler()
	}

	return (
		<button className={styles.primary} onClick={onButtonClick}>
			{children}
		</button>
	)
}
