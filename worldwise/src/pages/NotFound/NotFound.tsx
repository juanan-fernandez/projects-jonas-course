import styles from './NotFound.module.css'
import { NavBar } from '../../components/Navbar/Navbar'

export function NotFound() {
	return (
		<main className={styles.notfound}>
			<NavBar />
			<section>
				<h1>404 NOT FOUND</h1>
				<h1>Sorry... the requested page is not found</h1>
			</section>
		</main>
	)
}
