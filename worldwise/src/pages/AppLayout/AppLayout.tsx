import styles from './AppLayout.module.css'
import { SideBar } from '../../components/SideBar/SideBar'
import { Map } from '../../components/Map/Map'
import { Button } from '../../components/Button/Button'
import { useGeoLocation } from '../../hooks/useGeoLocation'

export function AppLayout() {
	const { loadingPosition: loading, geolocationPosition, getCurrentPos } = useGeoLocation()

	const showButton = geolocationPosition.lat === 0 && geolocationPosition.lng === 0

	return (
		<div className={styles.floating}>
			<main className={styles.layout}>
				<div className={styles.floatbutton}>
					{showButton && <Button onClick={getCurrentPos}>{loading ? 'Loading...' : 'Use my position'}</Button>}
				</div>
				<SideBar />
				<Map currentLocation={geolocationPosition} />
			</main>
		</div>
	)
}
