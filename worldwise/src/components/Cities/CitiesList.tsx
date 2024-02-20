import { useCities } from '../../store/cities/useCities'
import styles from './CitiesList.module.css'
import { CityItem } from './CityItem'

export function CitiesList() {
	const citiesCtx = useCities()
	const cities = citiesCtx.cities

	if (!cities.length) {
		return <p className={styles.instructions}>👋 Add your first city by clicking on a city on the map</p>
	}

	if (cities.length > 0) {
		return (
			<ul className={styles.listofcities}>
				{cities.map(city => {
					return <CityItem city={city} key={city.id} />
				})}
			</ul>
		)
	}
}
