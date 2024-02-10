import { createContext, useReducer, ReactNode } from 'react'
import { CitiesT, City, citiesReducer, initialCitiesState, cityActionsEnum } from './citiesReducer'

type cityContextType = {
	cities: CitiesT
	addCity: (city: City) => void
	deleteCity: (city: City) => void
}

export const citiesContext = createContext<cityContextType | null>(null)

function useCitiesReducer() {
	const [state, dispatch] = useReducer(citiesReducer, initialCitiesState)

	const addCity = (city: City) => {
		dispatch({ type: cityActionsEnum.ADD, payload: city })
	}

	const deleteCity = (city: City) => {
		dispatch({ type: cityActionsEnum.DELETE, payload: city })
	}

	return { state, addCity, deleteCity }
}

export function CitiesContextProvider({ children }: { children: ReactNode }): ReactNode {
	const { state: cities, addCity, deleteCity } = useCitiesReducer()

	return <citiesContext.Provider value={{ cities, addCity, deleteCity }}>{children}</citiesContext.Provider>
}
