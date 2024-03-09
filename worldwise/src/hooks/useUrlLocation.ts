import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type PositionT = { lat: number; lng: number } | null

export function useUrlLocation() {
	const [urlSearchParams] = useSearchParams()
	const [urlPosition, setUrlPositiion] = useState<PositionT>(null)
	const lat = Number(urlSearchParams.get('lat'))
	const lng = Number(urlSearchParams.get('lng'))

	function getUrlPosition() {
		if (lat && lng) setUrlPositiion({ lat, lng })
	}

	useEffect(() => {
		if (lat && lng) getUrlPosition()
	}, [lat, lng])

	return { urlLocation: urlPosition }
}
