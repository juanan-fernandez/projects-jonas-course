import { authReducer, authActionKind, initialAuthState, userT } from './authReducer'
import { ReactNode, createContext, useReducer } from 'react'

type authCtxType = {
	isAuth: boolean
	user: userT | null
	logIn?: (email: string, password: string) => void
	logOut?: () => void
}

const FAKE_USER = {
	name: 'JuanAn Fernández',
	email: 'juanicoylosdelacueva@gmail.com',
	avatar: 'https://robohash.org/elver.galarga@gmail.com'
}

const initialAuthCtx = { isAuth: false, user: null }

export const AuthContext = createContext<authCtxType>(initialAuthCtx)

export function useAuthReducer() {
	const [state, dispatch] = useReducer(authReducer, initialAuthState)

	const logIn = (email: string, password: string): void => {
		if (email === 'juanicoylosdelacueva@gmail.com' && password === 'enlab') {
			dispatch({ type: authActionKind.LOG_IN, payload: FAKE_USER })
		}
	}

	const logOut = (): void => {
		dispatch({ type: authActionKind.LOG_OUT })
	}

	return { state, logIn, logOut }
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
	const { state, logIn, logOut } = useAuthReducer()
	const { isAuth, user } = state
	return <AuthContext.Provider value={{ isAuth, user, logIn, logOut }}>{children}</AuthContext.Provider>
}
