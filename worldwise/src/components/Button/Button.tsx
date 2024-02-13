import styles from './Button.module.css'

type ButtonProps = {
	children: React.ReactNode
	onClick?: () => void
}

export function Button({ children, onClick }: ButtonProps) {
	return (
		<button className={styles.primary} onClick={onClick}>
			{children}
		</button>
	)
}
