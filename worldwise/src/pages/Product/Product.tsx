import { NavBar } from '../../components/Navbar/Navbar'
import styles from './Product.module.css'
export function Product(): React.JSX.Element {
	return (
		<main className={styles.product}>
			<NavBar />
			<section>
				<img src='/img-1.jpg' alt='About this Product' className={styles.img} />
				<div>
					<h2>About WorldWide</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat
						architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
						perspiciatis?
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus libero sunt expedita
						ratione iusto, magni, id sapiente sequi officiis et.
					</p>
				</div>
			</section>
		</main>
	)
}
