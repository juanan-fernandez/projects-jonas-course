import styles from './AddCityForm.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useReverseLocation } from '../../hooks/useReverseLocation'
import Spinner from '../Spinner/Spinner'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button/Button'
import { useCities } from '../../store/cities/useCities'
import { City } from '../../store/cities/citiesReducer'
import { useAuth } from '../../store/auth/useAuth'

function getEmojiFlag(countryCode: string) {
	const OFFSET = 127397 // Offset code for regional indicator symbol letters
	// Convert country code to uppercase
	const countryCodeUppercase: string = countryCode.toUpperCase()
	// Convert each letter of the country code to a flag emoji
	let emojiFlag = ''
	for (let i = 0; i < countryCodeUppercase.length; i++) {
		emojiFlag += String.fromCodePoint(countryCodeUppercase.charCodeAt(i) + OFFSET)
	}

	return emojiFlag
}

function getFormatedDate(): string {
	const today = new Date()
	const dd = String(today.getDate()).padStart(2, '0')
	const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
	const yyyy = today.getFullYear()

	return dd + '/' + mm + '/' + yyyy
}

export function AddCityForm(): React.JSX.Element {
	const { lat, lng } = useParams()
	const { isLoading, terror, location } = useReverseLocation(Number(lat), Number(lng))
	const formInit = { city: '', visited_on: '', notes: '' }
	const [formData, setFormData] = useState(formInit)
	const [emojiFlag, setEmojiFlag] = useState<string>('')
	const citiesCtx = useCities()
	const authCtx = useAuth()
	const navigate = useNavigate()

	const getFlag = useCallback(() => {
		if (location.countryCode) {
			const emoji = getEmojiFlag(location.countryCode)
			setEmojiFlag(emoji)
		}
	}, [location.countryCode])

	useEffect(() => {
		setFormData(prev => ({ ...prev, city: location.city, visited_on: getFormatedDate() }))

		getFlag()
	}, [location])

	const changeInputHandler = (
		ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setFormData(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
	}

	const submitHandler = (ev: React.FormEvent): void => {
		ev.preventDefault()
		if (formData.visited_on.trim() !== null) {
			const newLocation: City = {
				id: self.crypto.randomUUID(),
				cityName: formData.city,
				position: { lat: Number(lat), lng: Number(lng) },
				country: location.countryName,
				flag: emojiFlag,
				visited_on: formData.visited_on,
				notes: formData.notes,
				user: authCtx.user
			}
			citiesCtx.addCity(newLocation)

			navigate('/app/cities')
		}
	}

	return (
		<div className={styles.form}>
			{isLoading && <Spinner hexColor='#00c46a' />}
			{terror && <p>{`${terror.status} - ${terror.strErr}`}</p>}
			{!isLoading && !terror && location?.city && (
				<form onSubmit={submitHandler}>
					<label htmlFor='city'>City Name</label>
					<input type='text' name='city' value={formData.city} onChange={changeInputHandler} />
					<span>{emojiFlag}</span>
					<label htmlFor='visited_on'>When did you go to {location.city.slice(0, 25)}</label>
					<input type='text' name='visited_on' value={formData.visited_on} onChange={changeInputHandler} />
					<label htmlFor='notes'>Notes about your trip to {location.city.slice(0, 25)}</label>
					<textarea className={styles.bigger} name='notes' value={formData.notes} onChange={changeInputHandler} />
					<Button>ADD</Button>
				</form>
			)}
		</div>
	)
}
