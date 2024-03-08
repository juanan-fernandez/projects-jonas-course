/* eslint-disable indent */
import { userT } from '../auth/authReducer'

type PositionT = { lat: number; lng: number }

export type City = {
	id: string
	cityName: string
	country: string
	flag: string
	position: PositionT
	notes: string
	visited_on: string
	user: userT | null
}

export type CitiesT = City[]

export type citiesState = { cities: CitiesT; currentCity: City }

export const initialCitiesState: citiesState = { cities: [] as CitiesT, currentCity: {} as City }

export enum cityActionsEnum {
	ADD = 'ADD',
	DELETE = 'DELETE',
	GET = 'GET'
}

type addCityAction = { type: cityActionsEnum.ADD; payload: City }
type deleteCityAction = { type: cityActionsEnum.DELETE; payload: string }
type getCityAction = { type: cityActionsEnum.GET; payload: string }

type citiesAction = addCityAction | deleteCityAction | getCityAction

export function citiesReducer(state: citiesState, action: citiesAction): citiesState {
	const { type, payload } = action

	switch (type) {
		case cityActionsEnum.ADD:
			return { ...state, cities: [...state.cities, payload], currentCity: payload }

		case cityActionsEnum.DELETE:
			return { ...state, cities: state.cities.filter(city => city.id !== payload), currentCity: {} as City }

		case cityActionsEnum.GET:
			return { ...state, currentCity: state.cities.find(city => city.id === payload) ?? ({} as City) }

		default:
			return state
	}
}
