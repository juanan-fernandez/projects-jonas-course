import { City } from '../../store/cities/citiesReducer'
import { Link, useParams } from 'react-router-dom'
import { Backbutton } from '../BackButton/BackButton'

type CityDetailsProps = { city?: City }

export function CityDetails({ city }: CityDetailsProps) {
	//const params =useParams()

	if (!city) return null

	return (
		<section>
			<p>CITY NAME</p>
			<h3>
				<span>{city.flag}</span> {city.cityName}
			</h3>
			<p>You went to {city.cityName} on</p>
			<p>{city.visited_on}</p>
			<p>Your notes</p>
			<p>{city.notes}</p>
			<p>Learn more</p>
			<Link to={`https://es.wikipedia.org/wiki/${city.cityName}`}>CheckOut {city.cityName} on Wikipedia</Link>
			<Backbutton />
		</section>
	)
}
