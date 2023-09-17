import { WatchedMovie } from '../../../interfaces/movies';

type MoviesWatchedIemProps = { movie: WatchedMovie };

export function MoviesWatchedIem({ movie }: MoviesWatchedIemProps): React.JSX.Element {
	return <>{movie}</>;
}
