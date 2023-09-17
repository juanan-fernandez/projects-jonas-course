import { WatchedMovie } from '../../../interfaces/movies';
import { MoviesWatchedIem } from './MoviesWatchedItem';

type MoviesWatchedListProps = { movies: WatchedMovie[] };

export function MoviesWatchedList({ movies }: MoviesWatchedListProps): JSX.Element {
	return (
		<section>
			{
				//aquí van las stats
			}
			<ul>
				{movies.map(m => {
					return (
						<li key={m.id}>
							<MoviesWatchedIem movie={m} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}
