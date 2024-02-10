/* eslint-disable indent */
import { userT } from '../auth/authReducer'

type PositionT = { lat: number; lng: number }

export type City = {
	city: string
	country: string
	flag: string
	position: PositionT
	notes: string
	visited_on: string
	user: userT | null
}

export type CitiesT = City[]

export const initialCitiesState = [] as CitiesT

export enum cityActionsEnum {
	ADD = 'ADD',
	DELETE = 'DELETE'
}

type addCityAction = { type: cityActionsEnum.ADD; payload: City }
type deleteCityAction = { type: cityActionsEnum.DELETE; payload: City }

type citiesAction = addCityAction | deleteCityAction

export function citiesReducer(state: CitiesT, action: citiesAction): CitiesT {
	const { type, payload } = action

	switch (type) {
		case cityActionsEnum.ADD:
			return [...state, payload]

		case cityActionsEnum.DELETE:
			return state.filter(city => city.city !== payload.city)

		default:
			return state
	}
}
