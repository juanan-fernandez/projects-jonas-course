import { WatchedMovie } from '../../../interfaces/movies';
import { MoviesWatchedIem } from './MoviesWatchedItem';
import { MoviesWatchedStats } from './MoviesWatchedStats';

type MoviesWatchedListProps = { movies: WatchedMovie[]; deleteMovieFromWatched: (movieId: string) => void };

export function MoviesWatchedList({ movies, deleteMovieFromWatched }: MoviesWatchedListProps): JSX.Element {
	const deleteMovieFromList = (movieId: string): void => {
		deleteMovieFromWatched(movieId);
	};

	return (
		<section>
			<MoviesWatchedStats moviesList={movies} />
			<ul>
				{movies.map(m => {
					return (
						<li key={m.id}>
							<MoviesWatchedIem movie={m} deleteMovie={(): void => deleteMovieFromList(m.id)} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}
