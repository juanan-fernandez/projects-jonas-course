import './MoviesFetchedList.css';
import { useFetchMovies } from '../../../hooks/useFetchMovies';
import { MoviesFetchedItem } from './MoviesFetchedItem';
//mport { Movie } from '../../../interfaces/movies';

export function MoviesFetchedList(): JSX.Element {
	const url = 'https://www.omdbapi.com/?s=Captain&apikey=43aaed69';
	const { movies, terror, isLoading } = useFetchMovies(url);

	let renderOutput: React.ReactNode = null;

	if (isLoading) {
		renderOutput = <h1>Loading...</h1>;
	}

	if (movies && movies.length > 0) {
		//console.log('movies', movies);
		renderOutput = (
			<ul>
				{movies.map(item => (
					<li key={item.imdbID}>
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
