import styles from './AppLayout.module.css'
import { SideBar } from '../../components/SideBar/SideBar'

export function AppLayout() {
	return (
		<main className={styles.layout}>
			<SideBar />
		</main>
	)
}
