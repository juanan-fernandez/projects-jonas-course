import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

export function NavBar(): React.JSX.Element {
	return (
		<nav className={styles.menu}>
			<ul>
				<li>
					<NavLink to='/' className={({ isActive }) => (isActive ? styles.active : '')}>
						<img src='logo.png' />
					</NavLink>
				</li>
				<li>
					<NavLink to='/pricing' className={({ isActive }) => (isActive ? styles.active : '')}>
						PRICING
					</NavLink>
				</li>
				<li>
					<NavLink to='/product' className={({ isActive }) => (isActive ? styles.active : '')}>
						PRODUCT
					</NavLink>
				</li>
				<li>
					<NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : '')}>
						LOGIN
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}
