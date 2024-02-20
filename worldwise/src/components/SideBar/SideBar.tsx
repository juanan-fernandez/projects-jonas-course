import { Footer } from '../Footer/Footer'
import { AppNav } from '../AppNav/AppNav'
import styles from './SideBar.module.css'

export function SideBar() {
	return (
		<div className={styles.sidebar}>
			<AppNav />
			<Footer />
		</div>
	)
}
