import { useParams } from 'react-router-dom'
import { useReverseLocation } from '../../hooks/useReverseLocation'
import Spinner from '../Spinner/Spinner'

export function AddCityForm(): React.JSX.Element {
	const { lat, lng } = useParams()
	console.log({ lat, lng })
	const { isLoading, terror, location } = useReverseLocation(Number(lat), Number(lng))

	return (
		{isLoading && <Spinner hexColor='#00c46a'/>}
		{terror && <p>{terror}</p>}
		<div>
			<form>
				<label htmlFor='city'>City Name</label>
				<input type='text' name='city' />
				<label htmlFor='visited_on'>When did you go to X</label>
				<input type='text' name='visited_on' />
				<label htmlFor='notes'>Notes about your trip to X</label>
				<input type='text' name='notes' />
			</form>
		</div>
	)
}
