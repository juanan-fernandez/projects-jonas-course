import styles from './BackButton.module.css'
import { useNavigate } from 'react-router-dom'
export function Backbutton() {
	const navigate = useNavigate()

	const back = (ev: React.MouseEvent) => {
		ev.preventDefault()
		navigate(-1)
	}

	return (
		<button className={styles.button} onClick={back}>
			{' '}
			&larr; Back
		</button>
	)
}
