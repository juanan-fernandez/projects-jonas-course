import styles from './MovieDetails.module.css';
import { useFetchMovieDetails } from '../../../hooks/useFetchMovieDetails';
import StarRating from '../../UI/StarRating/StarRating';
import { Spinner } from '../../UI/Spinner/Spinner';
import { useState } from 'react';
import { WatchedMovie } from '../../../interfaces/movies';

type MovieDetailsProps = {
	movieId: string;
	addMovieToList: (movie: WatchedMovie) => void;
	goBack: () => void;
};

export function MovieDetails({ movieId, addMovieToList, goBack }: MovieDetailsProps): JSX.Element | undefined {
	let url = '';
	if (movieId) url = `https://www.omdbapi.com/?i=${movieId}&apikey=43aaed69`;

	const [rateSelected, setRateSelected] = useState(0);
	const { movie, terror, isLoading } = useFetchMovieDetails(url);

	const handleAddMovieToWatched = (): void => {
		const watchedMovie: WatchedMovie = {
			id: movieId,
			title: movie?.Title,
			poster: movie?.Poster,
			rating: Number(movie?.imdbRating),
			duration: parseInt(movie?.Runtime),
			myRating: rateSelected
		};
		addMovieToList(watchedMovie);
		goBack();
		return;
	};

	const handleShowButton =
		() =>
		(rate: number): void => {
			setRateSelected(rate);
		};

	if (isLoading) {
		return <Spinner />;
	}

	if (movie) {
		return (
			<div className={styles.details}>
				<button className={styles.goBack} onClick={goBack}>
					⬅️
				</button>
				<header className={styles.movie}>
					<div className={styles.moviedetails}>
						<img src={movie.Poster} alt={movie.Title} />
						<div className={styles.moviedetails__info}>
							<h2>{movie.Title}</h2>
							<p>
								{movie.Released} · {movie.Runtime}
							</p>
							<p>{movie.Genre} </p>
							<p>
								<span>⭐</span> {movie.imdbRating} IMDB Rating
							</p>
						</div>
					</div>
				</header>
				<section className={styles.movie__rating}>
					<div className={styles.stars}>
						<StarRating defaultRating={0} maxRating={10} size={24} onRating={handleShowButton()} />
						{rateSelected > 0 && (
							<button className={styles.button__add} onClick={handleAddMovieToWatched}>
								{' '}
								+ Add to List
							</button>
						)}
					</div>
					<p>{movie.Plot}</p>
					<p>{movie.Actors}</p>
					<p>{movie.Director}</p>
				</section>
			</div>
		);
	}

	if (terror) {
		console.log(terror);
		return <p>{terror.errMessage}</p>;
	}
}
