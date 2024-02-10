import { useEffect, useState } from 'react'
import type { geoLocPosition } from '../../hooks/useGeoLocation'
import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'

function GetClickedPoint() {
	const navigate = useNavigate()
	const eventMap = useMapEvent('click', () => {
		const { lat, lng } = eventMap.getCenter()
		navigate(`form/${lat}/${lng}`)
	})
	return null
}

function GotoClickedPoint({ position }: { position: geoLocPosition }) {
	const map = useMap()
	map.setView([position.lat, position.lng])
	return null
}

type MapProps = {
	currentLocation: geoLocPosition
}

export function Map({ currentLocation }: MapProps) {
	const [mapPosition, setMapPosition] = useState<geoLocPosition>({ lat: 36, lng: -5 })
	const [mapZoom, setMapZoom] = useState(6)
	const [marker, setMarker] = useState<geoLocPosition>()

	useEffect(() => {
		if (currentLocation) {
			if (currentLocation?.lat !== 0 || currentLocation?.lng !== 0) {
				setMapPosition({ lat: currentLocation.lat, lng: currentLocation.lng })
				setMarker({ lat: currentLocation.lat, lng: currentLocation.lng })
				setMapZoom(25)
			}
		}
	}, [currentLocation.lat, currentLocation.lng])

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
			<GetClickedPoint />
			<GotoClickedPoint position={mapPosition} />
		</MapContainer>
	)
}
