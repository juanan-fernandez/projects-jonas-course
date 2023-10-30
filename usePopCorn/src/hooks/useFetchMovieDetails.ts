import { useEffect, useState } from 'react';
import { MovieDetails } from '../interfaces/movies';

type ErrorT = {
	errMessage: string;
	errCode?: number;
} | null;

interface fetchMovieDetailsResponse {
	movie: MovieDetails;
	terror: ErrorT | null; // if there is an error, it will be stored in this variable. Otherwise undefined (optional)
	isLoading: boolean;
}

export function useFetchMovieDetails(url: string): fetchMovieDetailsResponse {
	const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
	const [isLoading, setIsLoading] = useState(true);
	const [terror, setTerror] = useState<ErrorT>(null);

	useEffect(() => {
		const controller = new AbortController();
		let requestStatus = 0;
		setTerror(null);

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
