import { useState } from 'react'

export type geoLocPosition = { lat: number; lng: number }

export function useGeoLocation() {
	const [loadingPosition, setLoadingPosition] = useState(false)
	const [geolocationPosition, setGeolocationPosition] = useState<geoLocPosition>({ lat: 0, lng: 0 })
	// const [terror, setTerror] = useState(null)
	function getCurrentPos() {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}
		setLoadingPosition(true)
		navigator.geolocation.getCurrentPosition(
			position => {
				const lat = position.coords.latitude || 0
				const lng = position.coords.longitude || 0
				setGeolocationPosition({ lat, lng })
				setLoadingPosition(false)
			},
			() => {
				setLoadingPosition(false)
				console.log('Error in getting current position')
			},
			options
		)
	}

	return { loadingPosition, geolocationPosition, getCurrentPos }
}
