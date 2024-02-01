import styles from './AppNav.module.css'
import { Logo } from '../Logo/Logo'
import { NavLink } from 'react-router-dom'
export function AppNav() {
	return (
		<nav className={styles.nav}>
			<Logo />

			<ul>
				<li>
					<NavLink to='/app/cities'>Cities</NavLink>
				</li>
				<li>
					<NavLink to='/app/countries' className={styles.active}>
						Countries
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
