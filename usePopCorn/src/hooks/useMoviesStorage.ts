import { useState } from 'react';
import { WatchedMovie } from '../interfaces/movies';

type WatchedMoviesList = WatchedMovie[];

function getMoviesStorage(): WatchedMoviesList {
	const moviesList = localStorage.getItem('movies');
	return moviesList ? (JSON.parse(moviesList) as WatchedMoviesList) : ([] as WatchedMoviesList);
}

function setMoviesStorage(listOfMovies: WatchedMoviesList): void {
	localStorage.setItem('movies', JSON.stringify(listOfMovies));
}

export function useMoviesStorage(): [WatchedMoviesList, (movie: WatchedMovie) => void, (movieId: string) => void] {
	const [localMovies, setLocalMovies] = useState<WatchedMoviesList>(getMoviesStorage());

	const addWatchedMovie = (movie: WatchedMovie): void => {
		//si la película existe no la añado.
		if (localMovies.some(m => m.id === movie.id)) return;

		setLocalMovies((prev: WatchedMoviesList): WatchedMoviesList => [...prev, movie]);
		//localStorage.setItem('movies', JSON.stringify([...localMovies, movie]));
		setMoviesStorage([...localMovies, movie]);
	};

	const deleteWatchedMovie = (movieId: string): void => {
		const updatedMovies = localMovies.filter(item => item.id !== movieId);
		setLocalMovies(updatedMovies);
		setMoviesStorage(updatedMovies);
	};

	return [localMovies, addWatchedMovie, deleteWatchedMovie];
}
