import styles from './Map.module.css'
import { useState } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvent, Marker, Popup } from 'react-leaflet'

function GetClickedPoint() {
	const eventMap = useMapEvent('click', () => {
		console.log(eventMap.getCenter())
		eventMap.getCenter()
	})
	return null
}

function GotoClickedPoint() {
	const map = useMap()
	map.setView([0, 0])
	return null
}

type MapProps = {
	currentLocation?: { lat: number | undefined; lng: number | undefined }
}

export function Map({ currentLocation }: MapProps) {
	const [position, setPosition] = useState()
	return (
		<MapContainer center={[0, 0]} zoom={6} scrollWheelZoom={true} className={styles.map}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
			<GetClickedPoint />
			<GotoClickedPoint />
		</MapContainer>
	)
}
