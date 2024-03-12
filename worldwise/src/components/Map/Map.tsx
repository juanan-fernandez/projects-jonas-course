import { useEffect, useState } from 'react'
import type { geoLocPosition } from '../../hooks/useGeoLocation'
import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { useUrlLocation } from '../../hooks/useUrlLocation'
import { useCities } from '../../store/cities/useCities'

function GetClickedPoint() {
	const navigate = useNavigate()
	useMapEvent('click', ev => {
		const { lat, lng } = ev.latlng
		navigate(`form?lat=${lat}&lng=${lng}`)
	})

	return null
}

function GotoClickedPoint({ position }: { position: geoLocPosition }) {
	const map = useMap()
	map.setView([position.lat, position.lng], map.getMaxZoom() * 0.4)
	return null
}

type MapProps = {
	currentLocation: geoLocPosition
}

export function Map({ currentLocation }: MapProps) {
	const [mapPosition, setMapPosition] = useState<geoLocPosition>({ lat: 40.416775, lng: -3.70379 })
	const [mapZoom, setMapZoom] = useState(10)
	const [marker, setMarker] = useState<geoLocPosition>()
	const { urlLocation } = useUrlLocation()
	const citiesCtx = useCities()
	const { cities } = citiesCtx

	useEffect(() => {
		if (currentLocation) {
			if (currentLocation?.lat !== 0 || currentLocation?.lng !== 0) {
				setMapPosition({ lat: currentLocation.lat, lng: currentLocation.lng })
				setMarker({ lat: currentLocation.lat, lng: currentLocation.lng })
			}
		}
	}, [currentLocation.lat, currentLocation.lng])

	useEffect(() => {
		if (urlLocation) {
			if (urlLocation.lat !== 0 || urlLocation.lng !== 0) {
				setMapPosition({ lat: urlLocation.lat, lng: urlLocation.lng })
			}
		}
	}, [urlLocation])

	return (
		<MapContainer center={[mapPosition?.lat, mapPosition?.lng]} zoom={mapZoom} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{marker && (
				<Marker position={[marker.lat, marker.lng]}>
					<Popup>
						You are here. <br /> Easily customizable.
					</Popup>
				</Marker>
			)}
			{cities.map(c => {
				return <Marker key={c.id} position={[c.position.lat, c.position.lng]} />
			})}
			<GetClickedPoint />
			<GotoClickedPoint position={mapPosition} />
		</MapContainer>
	)
}
