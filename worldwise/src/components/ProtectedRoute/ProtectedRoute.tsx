import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth/useAuth'
import { useEffect } from 'react'

type ProtectedRouteProps = {
	children: React.ReactNode
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuth } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		console.log(isAuth)

		if (!isAuth) navigate('/login', { replace: true })
	}, [isAuth])

	return <>{isAuth && children}</>
}
