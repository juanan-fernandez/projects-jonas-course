import styles from './BackButton.module.css'
import { useNavigate } from 'react-router-dom'
export function Backbutton() {
	const navigate = useNavigate()

	const back = () => {
		navigate(-1)
	}

	return (
		<button className={styles.button} onClick={back}>
			{' '}
			◀️ Back
		</button>
	)
}
