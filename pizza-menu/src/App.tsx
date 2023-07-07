import { type PizzaT, pizzaData } from './data/data';
import styles from './index.module.css';

function Pizza({ name, ingredients, price, photoName, soldOut }: PizzaT) {
	const soldOutStyle = soldOut ? styles['sold-out'] : '';
	return (
		<div className={`${styles.pizza} ${soldOutStyle}`}>
			<img src={photoName} alt='name' />
			<div>
				<h3>{name}</h3>
				<p>{ingredients}</p>
				<span>{soldOut ? 'SOLD OUT' : price}</span>
			</div>
		</div>
	);
}

//esta sería la manera de hacerlo con funciones flecha y React.FunctionalComponent (FC)
// interface PizzaListProps {
// 	pizzas: PizzaT[];
// }

// const PizzaList: React.FC<PizzaListProps> = ({ pizzas }) => {
// 	return (
// 		<div>
// 			<ul>
// 				<li>
// 					{pizzas.map(p => {
// 						return <Pizza {...p} />;
// 					})}
// 				</li>
// 			</ul>
// 		</div>
// 	);
// };

function Menu() {
	const menuList = pizzaData.map(item => (
		<li key={item.name}>
			<Pizza {...item} />
		</li>
	));
	return (
		<main className={styles.menu}>
			<h2>Our Menu</h2>
			<ul className={styles.pizzas}>{menuList}</ul>
		</main>
	);
}

function Header() {
	return (
		<header className={styles.header}>
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.order}>
				<p>
					{new Date().toLocaleTimeString()} - We're open from 12:00 to 22:00. Come
					visit us or order online
				</p>
				<button className={styles.btn}>Order</button>
			</div>
		</footer>
	);
}

function App() {
	return (
		<div className={styles.container}>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}
export default App;
