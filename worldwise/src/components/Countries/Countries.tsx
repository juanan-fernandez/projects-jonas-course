import styles from './Countries.module.css'
import { useCities } from '../../store/cities/useCities'

type Country = { countryName: string; flag: string }

function removeDuplicates(countries: Country[]): Country[] {
	return countries.filter((obj1, index) => {
		return countries.findIndex(obj2 => obj2.countryName === obj1.countryName) === index
	})
}

// //eso sería otra forma de hacerlo usando la funcion reduce y pasando la lista de ciudades directamente.
//import { City } from '../../store/cities/citiesReducer'
// function reduceDuplicates(cities: City[]): Country[] {
// 	return cities.reduce((arr, city) => {
// 		if (!arr.map((obj: Country) => obj.countryName).includes(city.country)) {
// 			return [...arr, { countryName: city.country, flag: city.flag }]
// 		} else return arr
// 	}, [] as Country[])
// }

export function Countries() {
	const { cities } = useCities()
	const countriesList: Country[] = cities.map(city => ({ countryName: city.country, flag: city.flag }))
	const countries: Country[] = removeDuplicates(countriesList) //

	return (
		<ul className={styles.list}>
			{countries.map(country => (
				<li key={country.countryName}>
					<span>{country.flag}</span>
					<h3>{country.countryName}</h3>
				</li>
			))}
		</ul>
	)
}
