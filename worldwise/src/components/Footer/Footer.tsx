import styles from './Footer.module.css'

export function Footer() {
	return (
		<div className={styles.copyright}>
			<p>&copy; Copyright {new Date().getFullYear()}</p> <p> by Juanan Fernandez</p>
		</div>
	)
}
