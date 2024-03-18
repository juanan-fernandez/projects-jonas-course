import styles from './AddCityForm.module.css'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useReverseLocation } from '../../hooks/useReverseLocation'
import Spinner from '../Spinner/Spinner'
import { useCallback, useEffect, useState, useRef } from 'react'
import { Button } from '../Button/Button'
import { useCities } from '../../store/cities/useCities'
import { City } from '../../store/cities/citiesReducer'
import { useAuth } from '../../store/auth/useAuth'
import Calendar from '../Calendar/Calendar'
import Modal from '../Modal/Modal'

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

function getFormatedDate(theDate: string): string {
	const date = new Date(theDate)
	const dd = String(date.getDate()).padStart(2, '0')
	const mm = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
	const yyyy = date.getFullYear()
	return dd + '/' + mm + '/' + yyyy
}

function reverseStringDate(theDate: string): string {
	theDate = theDate.split('/').reverse().join('-')
	return theDate
}

export function AddCityForm(): React.JSX.Element {
	const [formData, setFormData] = useState({
		city: '',
		visited_on: '',
		notes: ''
	})
	const [urlSearchParams] = useSearchParams()
	const lat = Number(urlSearchParams.get('lat'))
	const lng = Number(urlSearchParams.get('lng'))
	const { isLoading, terror, location } = useReverseLocation(Number(lat), Number(lng))
	const [showModal, setShowModal] = useState(false)
	const [showCal, setShowCal] = useState(false)
	const [emojiFlag, setEmojiFlag] = useState<string>('')
	const notesRef = useRef<HTMLTextAreaElement>(null)
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
		setFormData({ notes: '', city: location.city, visited_on: getFormatedDate(new Date().toISOString()) })
		getFlag()
	}, [location])

	useEffect(() => {
		if (terror) {
			setShowModal(true)
		} else {
			setShowModal(false)
		}
	}, [terror])

	const changeInputHandler = (
		ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		setFormData(prev => ({ ...prev, [ev.target.name]: ev.target.value }))
	}

	const submitHandler = (ev: React.FormEvent): void => {
		ev.preventDefault()
		if (formData.visited_on.trim() === '' || formData.city.trim() === '') return

		const newLocation: City = {
			id: self.crypto.randomUUID(),
			cityName: formData.city,
			position: { lat: Number(lat), lng: Number(lng) },
			country: location.countryName,
			flag: emojiFlag,
			visited_on: new Date(reverseStringDate(formData.visited_on)).toISOString(),
			notes: formData.notes,
			user: authCtx.user
		}

		citiesCtx.addCity(newLocation)

		navigate('/app/cities')
	}

	const toggleCalendar = (): void => {
		setShowCal(!showCal)
	}

	const hideCalendar = (): void => {
		if (showCal) {
			setShowCal(false)
			notesRef.current?.focus()
		}
	}

	const updateVisitedOn = (myDate: string): void => {
		setFormData(form => ({ ...form, visited_on: getFormatedDate(new Date(myDate).toISOString()) }))
		toggleCalendar()
		notesRef.current?.focus()
	}

	const hideModal = () => {
		setShowModal(false)
	}

	return (
		<div className={styles.form}>
			{isLoading && <Spinner hexColor='#00c46a' />}
			{terror && showModal && (
				<Modal modalType='err' onModalClick={hideModal}>
					<p>{`${terror.status} - ${terror.strErr}`}</p>
				</Modal>
			)}
			{!isLoading && !terror && location?.city && (
				<form onSubmit={submitHandler}>
					<label htmlFor='city'>City Name</label>
					<input type='text' name='city' id='city' value={formData.city} onChange={changeInputHandler} />
					<span>{emojiFlag}</span>
					<label htmlFor='visited_on'>When did you go to {location.city.slice(0, 25)}</label>
					<input
						type='text'
						name='visited_on'
						id='visited_on'
						value={formData.visited_on}
						onChange={changeInputHandler}
						onClick={toggleCalendar}
					/>

					{showCal && (
						<Calendar
							width='300px'
							updateDate={updateVisitedOn}
							selectDate={getFormatedDate(formData.visited_on)}
						/>
					)}
					<label htmlFor='notes'>Notes about your trip to {location.city.slice(0, 25)}</label>
					<textarea
						ref={notesRef}
						className={styles.bigger}
						name='notes'
						id='notes'
						value={formData.notes}
						onChange={changeInputHandler}
						onFocus={hideCalendar}
					/>
					<Button>ADD</Button>
				</form>
			)}
		</div>
	)
}
