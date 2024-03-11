import { useAuth } from '../../store/auth/useAuth'

export function User() {
	const userCtx = useAuth()

	if (!userCtx.user || !userCtx.logOut) return null
	const { avatar, name } = userCtx.user
	const { logOut } = userCtx

	return (
		<div>
			<img src={avatar} alt={name} />
			<p>Welcome {name} </p>
			<button onClick={logOut}>LogOut</button>
		</div>
	)
}
