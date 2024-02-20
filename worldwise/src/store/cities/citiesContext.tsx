import { createContext, useReducer, ReactNode } from 'react'
import { CitiesT, City, citiesReducer, initialCitiesState, cityActionsEnum } from './citiesReducer'

type cityContextType = {
	cities: CitiesT
	currentCity: City
	addCity: (city: City) => void
	deleteCity: (cityId: string) => void
}

export const citiesContext = createContext<cityContextType | null>(null)

function useCitiesReducer() {
	const [state, dispatch] = useReducer(citiesReducer, initialCitiesState)

	const addCity = (city: City) => {
		dispatch({ type: cityActionsEnum.ADD, payload: city })
	}

	const deleteCity = (cityId: string) => {
		dispatch({ type: cityActionsEnum.DELETE, payload: cityId })
	}

	return { state, addCity, deleteCity }
}

export function CitiesContextProvider({ children }: { children: ReactNode }): ReactNode {
	const { state, addCity, deleteCity } = useCitiesReducer()
	const { cities, currentCity } = state

	return (
		<citiesContext.Provider value={{ cities, currentCity, addCity, deleteCity }}>{children}</citiesContext.Provider>
	)
}
