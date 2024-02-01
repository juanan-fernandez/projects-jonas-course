import { authReducer, authActionKind, authState, initialAuthState } from './authReducer'
import { ReactNode, createContext, useReducer } from 'react'

type authCtxType = {
	loginData: authState
	logIn: () => void
	logOut: () => void
}

const FAKE_USER = {
	name: 'JUANAN FERNANDEZ',
	email: 'juanicoylosdelacueva@gmail.com',
	avatar: 'https://robohash.org/elver.galarga@gmail.com'
}

export const AuthContext = createContext<authCtxType | null>(null)

export function useAuth() {
	const [state, dispatch] = useReducer(authReducer, initialAuthState)

	const logIn = (): void => {
		dispatch({ type: authActionKind.LOG_IN, payload: FAKE_USER })
	}

	const logOut = (): void => {
		dispatch({ type: authActionKind.LOG_OUT })
	}

	return { state, logIn, logOut }
}

export function contextProvider({ children }: { children: ReactNode }) {
	const { state, logIn, logOut } = useAuth()
	return <AuthContext.Provider value={{ loginData: state, logIn, logOut }}>{children}</AuthContext.Provider>
}
