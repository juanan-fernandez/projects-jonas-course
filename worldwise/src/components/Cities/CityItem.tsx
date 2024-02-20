import { City } from '../../store/cities/citiesReducer'

type CityItemProps = {
	city: City
}

export function CityItem({ city }: CityItemProps) {
	return <li>{city.cityName}</li>
}
