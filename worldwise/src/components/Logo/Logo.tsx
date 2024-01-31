import styles from './Logo.module.css'
export function Logo() {
	return (
		<div>
			<img src='/logo.png' className={styles.logo} />
		</div>
	)
}
