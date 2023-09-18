import styles from './MoviesWatchedItem.module.css';
import { WatchedMovie } from '../../../interfaces/movies';

type MoviesWatchedIemProps = { movie: WatchedMovie; deleteMovie: () => void };

export function MoviesWatchedIem({ movie, deleteMovie }: MoviesWatchedIemProps): React.JSX.Element {
	return (
		<section className={styles.watched}>
			<img src={movie.poster} />{' '}
			<div className={styles.watched__details}>
				<h2>{movie.title}</h2>
				<div className={styles['watched__details--data']}>
					<span>⭐️ {movie.rating}</span>
					<span>🌟 {movie.myRating}</span>
					<span>⌛ {movie.duration} min.</span>
				</div>
			</div>
			<button className={styles.button__delete} onClick={deleteMovie}>
				X
			</button>
		</section>
	);
}
