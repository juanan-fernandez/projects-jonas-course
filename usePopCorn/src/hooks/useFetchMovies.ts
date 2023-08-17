import { useEffect, useState } from 'react';
import { Movie } from '../interfaces/movies';

interface Error {
	errMessage: string;
}

interface fetchMoviesResponse {
	movies: Movie[];
	terror: Error | undefined; // if there is an error, it will be stored in this variable. Otherwise undefined (optional)
	isLoading: boolean;
}

export function useFetchMovies(url: string): fetchMoviesResponse {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [terror, setTerror] = useState();

	useEffect(() => {
		async function fetchMovies(): Promise<void> {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Error al obtener los datos');
				}
			} catch (err) {
				console.log('ERROR', err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovies();
	}, [url]);

	return { movies, terror, isLoading };
}
