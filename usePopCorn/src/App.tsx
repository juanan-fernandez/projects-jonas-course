import './App.css';
//hooks
import { useDeferredValue, useState } from 'react';
import { useMoviesStorage } from './hooks/useMoviesStorage';
//components
import Box from './componets/UI/Box/Box';
import { Header } from './componets/UI/Header/Header';
import { MovieDetails } from './componets/Movies/MovieDetails/MovieDetails';
import { MoviesWatchedList } from './componets/Movies/MoviesWatchedList/MoviesWatchedList';
import { MoviesFetchedList } from './componets/Movies/MoviesFetchedList/MoviesFetchedList';

function App(): JSX.Element {
	const [localMovies, setWatchedMovie] = useMoviesStorage();
	const [results, setResults] = useState(0);
	const [movieId, setMovieId] = useState('');
	const [query, setQuery] = useState('');
	const deferredQuery = useDeferredValue(query);

	const updateResults = (numberOfResults: number): void => {
		setResults(numberOfResults);
	};

	const updateMovieId = (id: string): void => {
		setMovieId(id);
	};

	const clearMovieId = (): void => {
		setMovieId('');
	};

	return (
		<>
			<Header results={results} query={query} setQuery={setQuery} />
			<main className='boxes'>
				<Box>
					<MoviesFetchedList onUpdateResults={updateResults} onUpdateMovieId={updateMovieId} search={deferredQuery} />
				</Box>
				<Box>
					{movieId ? (
						<MovieDetails movieId={movieId} addMovieToList={setWatchedMovie} goBack={clearMovieId} />
					) : (
						<MoviesWatchedList movies={localMovies} />
					)}
				</Box>
			</main>
		</>
	);
}

export default App;
