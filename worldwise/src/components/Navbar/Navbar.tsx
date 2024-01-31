import { Logo } from '../Logo/Logo'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

export function NavBar(): React.JSX.Element {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to='/pricing' className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
						PRICING
					</NavLink>
				</li>
				<li>
					<NavLink to='/product' className={({ isActive }) => (isActive ? `${styles.active}` : '')}>
						PRODUCT
					</NavLink>
				</li>
				<li>
					<NavLink to='/login' className={styles.login}>
						LOGIN
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
