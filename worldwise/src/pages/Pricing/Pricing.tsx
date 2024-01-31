import styles from './Pricing.module.css'
import { NavBar } from '../../components/Navbar/Navbar'

export function Pricing(): React.JSX.Element {
	return (
		<main className={styles.pricing}>
			<NavBar />
			<section>
				<div>
					<h2>Simple pricing. Just $9/month.</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto. Recusandae
						quos provident, laboriosam fugit voluptatem iste.
					</p>
				</div>
				<img src='/img-2.jpg' />
			</section>
		</main>
	)
}
