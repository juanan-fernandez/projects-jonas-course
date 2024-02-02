import { AppNav } from '../AppNav/AppNav'
import styles from './SideBar.module.css'
export function SideBar() {
	return (
		<div className={styles.sidebar}>
			<AppNav />
			<p>👋 Add your first city by clicking on a city on the map</p>
		</div>
	)
}
