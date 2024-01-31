import styles from './Home.module.css'
import { NavBar } from '../../components/Navbar/Navbar'
import { Link } from 'react-router-dom'

export function Home(): React.JSX.Element {
	return (
		<main className={styles.homepage}>
			<NavBar />
			<section>
				<h1>You travel the world.</h1>
				<h1>WorldWise keep track of your adventures.</h1>
				<h3>
					A world map that tracks your footsteps into every city you can think of. Never forget your wonderful
					experiences, and show your friends how you have wandered the world.
				</h3>
				<Link className={styles.cta} to='/login'>
					Start Tracking now
				</Link>
			</section>
		</main>
	)
}
