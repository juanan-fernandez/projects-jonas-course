/* eslint-disable indent */
export enum authActionKind {
	LOG_IN = 'LOGIN',
	LOG_OUT = 'LOGOUT'
}

type userT = {
	email: string
	name: string
	avatar: string
}

export type authState = {
	user: userT | null
	isAuth: boolean
}

type logInAction = { type: authActionKind.LOG_IN; payload: userT }
type logOutAction = { type: authActionKind.LOG_OUT }

type authAction = logInAction | logOutAction

export const initialAuthState: authState = { isAuth: false, user: null }

export function authReducer(state: authState, action: authAction) {
	switch (action.type) {
		case authActionKind.LOG_IN:
			return { ...state, isAuth: true }
		case authActionKind.LOG_OUT:
			return { ...state, user: null, isAuth: false }
		default:
			return { ...state, user: null, isAuh: false }
	}
}
