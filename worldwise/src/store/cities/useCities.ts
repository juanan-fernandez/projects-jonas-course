import { useContext } from 'react'
import { citiesContext } from './citiesContext'

export function useCities() {
	const citiesCtx = useContext(citiesContext)
	if (!citiesCtx) {
		throw new Error('citiesContext must be used inside a context provider')
	}
	return citiesCtx
}
