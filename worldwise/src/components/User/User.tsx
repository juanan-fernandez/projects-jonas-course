import styles from './User.module.css'
import { useAuth } from '../../store/auth/useAuth'
import { useNavigate } from 'react-router-dom'

export function User() {
	const navigate = useNavigate()
	const userCtx = useAuth()

	if (!userCtx.user || !userCtx.logOut) return null
	const { avatar, name } = userCtx.user
	const { logOut } = userCtx

	const handleClick = () => {
		logOut()
		navigate('/')
	}

	return (
		<div className={styles.user}>
			<img src={avatar} alt={name} />
			<p>Welcome {name.substring(0, name.indexOf(' '))} </p>
			<button onClick={handleClick}>LOGOUT</button>
		</div>
	)
}
