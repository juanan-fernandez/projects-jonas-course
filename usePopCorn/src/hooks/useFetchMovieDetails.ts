import { useEffect, useState } from 'react';
import { MovieDetails } from '../interfaces/movies';

interface Error {
	errMessage: string;
	errCode?: number;
}

interface fetchMovieDetailsResponse {
	movie: MovieDetails;
	terror: Error | undefined; // if there is an error, it will be stored in this variable. Otherwise undefined (optional)
	isLoading: boolean;
}

export function useFetchMovieDetails(url: string): fetchMovieDetailsResponse {
	const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
	const [isLoading, setIsLoading] = useState(true);
	const [terror, setTerror] = useState<Error>();

	useEffect(() => {
		const controller = new AbortController();
		let requestStatus = 0;

		async function fetchMovieDetails(): Promise<void> {
			try {
				const response = await fetch(url, { signal: controller.signal });
				if (!response.ok) {
					requestStatus = response.status;
					throw new Error('Error al obtener los datos');
				}
				requestStatus = response.status;
				const data = (await response.json()) as MovieDetails;
				setMovie(data);
			} catch (err) {
				if (!controller.signal.aborted) {
					console.log('ERROR', err);
					setTerror({ errMessage: err as string, errCode: requestStatus });
				}
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovieDetails();

		return () => {
			controller.abort();
		};
	}, [url]);

	return { movie, terror, isLoading };
}
