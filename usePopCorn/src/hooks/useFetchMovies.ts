import { useEffect, useState } from 'react';
import { Movie, SearchMovie } from '../interfaces/movies';

interface Error {
	errMessage: string;
	errCode?: number;
}

type MoviesList = Movie[];

interface fetchMoviesResponse {
	movies: MoviesList;
	terror: Error | undefined; // if there is an error, it will be stored in this variable. Otherwise undefined (optional)
	isLoading: boolean;
}

export function useFetchMovies(url: string): fetchMoviesResponse {
	const [movies, setMovies] = useState<MoviesList>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [terror, setTerror] = useState<Error>();

	useEffect(() => {
		const controller = new AbortController();
		let requestStatus = 0;
		async function fetchMovies(): Promise<void> {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					requestStatus = response.status;
					throw new Error('Error al obtener los datos');
				}
				requestStatus = response.status;
				const data = (await response.json()) as SearchMovie;
				console.log(data.Search);
				setMovies(data.Search);
			} catch (err) {
				console.log('ERROR', err);
				setTerror({ errMessage: err as string, errCode: requestStatus });
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovies();

		return () => {
			//controller.abort();
		};
	}, [url]);

	return { movies, terror, isLoading };
}
