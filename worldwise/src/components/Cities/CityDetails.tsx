import styles from './CityDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import { Backbutton } from '../BackButton/Backbutton'
import { useCities } from '../../store/cities/useCities'
import { useEffect } from 'react'

export function CityDetails() {
	const params = useParams()
	const { id } = params
	const { getCity, currentCity } = useCities()

	useEffect(() => {
		if (id) getCity(id)
	}, [id])

	if (!currentCity) return null

	const { flag, cityName, visited_on, notes } = currentCity

	return (
		<section className={styles.details}>
			<div className={styles.row}>
				<h6>CITY NAME</h6>
				<h3>
					<span>{flag}</span> {cityName}
				</h3>
			</div>
			<div className={styles.row}>
				<h6>You went to {cityName} on</h6>
				<p className={styles.data}>{visited_on}</p>
			</div>
			<div className={styles.row}>
				<h6>Your notes</h6>
				<p className={styles.data}>{notes}</p>
			</div>
			<div className={styles.row}>
				<h6>Learn more</h6>
				<Link
					className={styles.wiki}
					to={`https://es.wikipedia.org/wiki/${cityName}`}
					target='_blank'
					rel='noreferrer'
				>
					CheckOut {cityName} on Wikipedia &rarr;
				</Link>
			</div>
			<div>
				<Backbutton />
			</div>
		</section>
	)
}
