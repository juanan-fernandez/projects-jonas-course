import styles from './CityItem.module.css'
import { City } from '../../store/cities/citiesReducer'
import { useCities } from '../../store/cities/useCities'
import { Link } from 'react-router-dom'

type CityItemProps = {
	city: City
}

function getFormatted(theDate: string): string {
	const myDate = new Date(theDate)
	return Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(myDate)
}

export function CityItem({ city }: CityItemProps) {
	const { deleteCity, currentCity } = useCities()
	const { lat, lng } = city.position
	const handleDelete = (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		deleteCity(city.id)
	}

	return (
		<li>
			<Link
				to={`${city.id}?lat=${lat}&lng=${lng}`}
				className={`${styles.city} ${city.id === currentCity.id ? styles['city--active'] : ''}`}
			>
				<span>{city.flag}</span>
				<h3>{city.cityName}</h3>
				<time>({getFormatted(city.visited_on)})</time>
				<button className={styles.delete} onClick={handleDelete}>
					&times;
				</button>
			</Link>
		</li>
	)
}
