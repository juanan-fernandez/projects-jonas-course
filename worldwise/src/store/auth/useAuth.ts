import { useContext } from 'react'
import { AuthContext } from './authContext'

export function useAuth() {
	const authCtx = useContext(AuthContext)
	if (authCtx === undefined) {
		throw new Error('AuthContext has was used outside AuthProvider')
	}
	return authCtx
}
