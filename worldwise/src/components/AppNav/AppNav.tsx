import styles from './AppNav.module.css'
import { Logo } from '../Logo/Logo'
import { NavLink, Outlet } from 'react-router-dom'
export function AppNav() {
	return (
		<nav className={styles.nav}>
			<Logo />

			<ul>
				<li>
					<NavLink to='cities'>Cities</NavLink>
				</li>
				<li>
					<NavLink to='countries' className={styles.active}>
						Countries
					</NavLink>
				</li>
			</ul>
			<Outlet />
		</nav>
	)
}
