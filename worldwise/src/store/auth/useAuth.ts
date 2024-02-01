import { useContext } from 'react'
import { AuthContext } from './authContext'

export function useAuth() {
	const authCtx = useContext(AuthContext)
	if (authCtx === undefined) {
		throw new Error('AuthContext has been used outside AuthProvider')
	}
	return authCtx
}
