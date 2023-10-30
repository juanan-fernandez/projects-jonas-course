import { useEffect, useState } from 'react';
import { Movie, SearchMovie } from '../interfaces/movies';

type ErrorT = {
	errMessage: string;
	errCode?: number;
};

type MoviesList = Movie[];

interface fetchMoviesResponse {
	movies: MoviesList;
	terror: ErrorT | undefined; // if there is an error, it will be stored in this variable. Otherwise undefined (optional)
	isLoading: boolean;
}

export function useFetchMovies(url: string): fetchMoviesResponse {
	const [movies, setMovies] = useState<MoviesList>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [terror, setTerror] = useState<ErrorT>();

	useEffect(() => {
		const controller = new AbortController();
		let requestStatus = 0;
		setTerror(undefined);
		async function fetchMovies(): Promise<void> {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					requestStatus = response.status;
					throw new Error('Error al obtener los datos');
				}
				requestStatus = response.status;
				const data = (await response.json()) as SearchMovie;
				if (!data.Search) throw new Error('Movies not found');

				setMovies(data.Search);
			} catch (err) {
				if (!controller.signal.aborted) {
					let errorMessage = 'Unknown error';
					if (err instanceof Error) errorMessage = err.message;
					setTerror({ errMessage: errorMessage, errCode: requestStatus });
				}
			} finally {
				setIsLoading(false);
			}
		}

		url ? fetchMovies() : setIsLoading(false);

		return () => {
			controller.abort();
		};
	}, [url]);

	return { movies, terror, isLoading };
}
