import { useRequesApi } from './useRequestApi'
import { useEffect, useState } from 'react'

export interface LocalityT {
	city: string
	continent: string
	continentCode: string
	countryCode: string
	countryName: string
	latitude: number
	locality: string
	localityLanguageRequested: string
	longitude: number
	plusCode: string
	postcode: string
	principalSubdivision: string
	principalSubdivisionCode: string
}

export function useReverseLocation(lat: number, lng: number) {
	const key = import.meta.env.VITE_REVERSEAPI as string
	const url = `https://api-bdc.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${key}`

	const [location, setLocation] = useState<LocalityT>({} as LocalityT)
	const { isLoading, terror, requestApi } = useRequesApi({ url })

	useEffect(() => {
		async function getLocalityData() {
			const data = await requestApi<LocalityT>()
			if (data) setLocation(data)
		}
		getLocalityData()
	}, [url])

	return { isLoading, terror, location }
}
