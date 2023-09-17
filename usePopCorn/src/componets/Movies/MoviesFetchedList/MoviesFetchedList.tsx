import './MoviesFetchedList.css';
import { useFetchMovies } from '../../../hooks/useFetchMovies';
import { MoviesFetchedItem } from './MoviesFetchedItem';
import { Spinner } from '../../UI/Spinner/Spinner';
//mport { Movie } from '../../../interfaces/movies';

type MoviesFetchedListProps = {
	onUpdateResults: (res: number) => void;
	onUpdateMovieId: (id: string) => void;
	search?: string;
};
export function MoviesFetchedList({ onUpdateResults, onUpdateMovieId, search }: MoviesFetchedListProps): JSX.Element {
	const url = search ? `https://www.omdbapi.com/?s=${search}&apikey=43aaed69` : '';
	const { movies, terror, isLoading } = useFetchMovies(url);

	let renderOutput: React.ReactNode = null;

	if (isLoading) {
		renderOutput = (
			<div>
				<Spinner />
			</div>
		);
	}

	if (movies && movies.length > 0) {
		onUpdateResults(movies.length);

		renderOutput = (
			<ul>
				{movies.map(item => (
					<li key={item.imdbID} onClick={(): void => onUpdateMovieId(item.imdbID)}>
						<MoviesFetchedItem movie={item} />
					</li>
				))}
			</ul>
		);
	}

	if (terror) {
		console.log(terror);
		renderOutput = <p>{terror.errMessage}</p>;
	}

	return <>{renderOutput}</>;
}
