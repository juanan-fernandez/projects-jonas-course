import './MoviesFetchedList.css';
import { useFetchMovies } from '../../../hooks/useFetchMovies';
import { MoviesFetchedItem } from './MoviesFetchedItem';
import { Spinner } from '../../UI/Spinner/Spinner';
import { useEffect } from 'react';
import { ErrorMessage } from '../../UI/ErrorMessage/ErrorMessage';

type MoviesFetchedListProps = {
	onUpdateResults: (res: number) => void;
	onUpdateMovieId: (id: string) => void;
	search?: string;
};
export function MoviesFetchedList({ onUpdateResults, onUpdateMovieId, search }: MoviesFetchedListProps): JSX.Element {
	const url = search ? `https://www.omdbapi.com/?s=${search}&apikey=43aaed69` : '';
	const { movies, terror, isLoading } = useFetchMovies(url);
	let renderOutput: React.ReactNode = null;

	useEffect(() => {
		movies ? onUpdateResults(movies.length) : onUpdateResults(0);
	}, [movies]);

	if (isLoading) {
		renderOutput = (
			<div>
				<Spinner />
			</div>
		);
	}

	if (movies && movies.length > 0) {
		renderOutput = (
			<ul>
				{movies.map(item => (
					<li className='list__item' key={item.imdbID} onClick={(): void => onUpdateMovieId(item.imdbID)}>
						<MoviesFetchedItem movie={item} />
					</li>
				))}
			</ul>
		);
	}

	if (terror) {
		renderOutput = <ErrorMessage message={terror.errMessage} />;
	}

	if (!terror && url && (!movies || movies.length === 0)) renderOutput = <ErrorMessage message='MOVIE NOT FOUND' />;

	return <>{renderOutput}</>;
}
