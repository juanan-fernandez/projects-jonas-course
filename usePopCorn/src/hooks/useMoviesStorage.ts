import { useState } from 'react';
import { WatchedMovie } from '../interfaces/movies';

type WatchedMoviesList = WatchedMovie[];

function getMoviesStorage(): WatchedMoviesList {
	const moviesList = localStorage.getItem('movies');
	return moviesList ? (JSON.parse(moviesList) as WatchedMovie[]) : ([] as WatchedMoviesList);
}

export function useMoviesStorage(): [WatchedMoviesList, (movie: WatchedMovie) => void] {
	const [localMovies, setLocalMovies] = useState<WatchedMoviesList>(getMoviesStorage());

	const setWatchedMovie = (movie: WatchedMovie): void => {
		setLocalMovies((prev: WatchedMoviesList): WatchedMoviesList => [...prev, movie]);
		localStorage.setItem('movies', JSON.stringify([...localMovies, movie]));
	};

	return [localMovies, setWatchedMovie];
}
