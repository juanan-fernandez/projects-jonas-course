import styles from './MoviesWatchedStats.module.css';
import { WatchedMovie } from '../../../interfaces/movies';

type MoviesWatchedStatsProps = { moviesList: WatchedMovie[] };
type MoviesAvg = { numberOfMovies: number; avgRate: number; avgMyRate: number; avgDuration: number };

export function MoviesWatchedStats({ moviesList }: MoviesWatchedStatsProps): React.JSX.Element {
	const lenArray = moviesList.length;
	const avg: MoviesAvg = moviesList.reduce(
		(acc: MoviesAvg, curr: WatchedMovie) => {
			acc.avgRate += curr.rating / lenArray;
			acc.avgMyRate += curr.myRating / lenArray;
			acc.avgDuration += curr.duration / lenArray;
			return acc;
		},
		{ numberOfMovies: lenArray, avgRate: 0, avgMyRate: 0, avgDuration: 0 }
	);

	return (
		<section className={styles.stats}>
			<h3>MOVIES YOU WATCHED</h3>
			<div className={styles.stats__data}>
				<span>#️⃣ {avg.numberOfMovies} movies</span>
				<span>⭐ {avg.avgRate.toFixed(2)} </span>
				<span>🌟 {avg.avgMyRate.toFixed(2)} </span>
				<span>⌛{avg.avgDuration.toFixed(2)} min.</span>
			</div>
		</section>
	);
}
