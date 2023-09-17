import style from './MoviesFetchedItem.module.css';
import { Movie } from '../../../interfaces/movies';

interface MoviesFetchedItemProps {
	movie: Movie;
}

export function MoviesFetchedItem({ movie }: MoviesFetchedItemProps): JSX.Element {
	return (
		<article className={style.movie}>
			<img src={movie.Poster ? movie.Poster : 'https://image.tmdb.org/t/p/w200'} />
			<div className={style.movie__info}>
				<h3>{movie.Title}</h3>
				<p>
					<span>🗓</span>
					{movie.Year}
				</p>
			</div>
		</article>
	);
}
