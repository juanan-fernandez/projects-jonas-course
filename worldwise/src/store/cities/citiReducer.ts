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

export type Cities = City[]

const initialCitiesState = [] as Cities
