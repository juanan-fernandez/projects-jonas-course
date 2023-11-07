import { useKey } from '../../../hooks/useKey';
import styles from './Header.module.css';
import { useRef } from 'react';

type HeaderProps = {
	results: number;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	closeMovieDetails: () => void;
};

export function Header({ results, query, setQuery, closeMovieDetails }: HeaderProps): JSX.Element {
	const queryRef = useRef<HTMLInputElement>(null);
	useKey('Enter', resetInput);

	function resetInput(): void {
		if (document.activeElement === queryRef.current) return;
		if (queryRef.current instanceof HTMLInputElement) {
			queryRef.current.value = '';
			setQuery('');
			closeMovieDetails();
			queryRef.current.focus();
		}
	}

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
					ref={queryRef}
				/>
			</div>
			<div className={styles.header__results}>Found {results} results</div>
		</nav>
	);
}
