import styles from './Header.module.css';

type HeaderProps = {
	results: number;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export function Header({ results, query, setQuery }: HeaderProps): JSX.Element {
	return (
		<nav className={styles.header}>
			<div className={styles.header__title}>
				<span>🍿</span>usePopCorn
			</div>
			<div>
				<input
					type='text'
					value={query}
					onChange={(ev): void => setQuery(ev.currentTarget.value)}
					placeholder='Search movies...'
				/>
			</div>
			<div className={styles.header__results}>Found {results} results</div>
		</nav>
	);
}
