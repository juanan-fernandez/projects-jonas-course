import { useState } from 'react'

type RequestApiT = {
	url: string
	method?: 'GET' | 'POST' | 'DELETE' | 'PUT'
	headers?: HeadersInit | undefined
	body?: unknown
}

type ErrorT = {
	status: number
	strErr: string
}

export function useRequesApi(request: RequestApiT) {
	const [isLoading, setIsLoading] = useState(false)
	const [terror, setTerror] = useState<ErrorT | null>(null)
	let responseStatus = 0

	async function requestApi<T>(): Promise<T | undefined> {
		try {
			setIsLoading(true)
			const response = await fetch(request.url, {
				method: request.method ? request.method : 'GET',
				headers: request.headers ? request.headers : {},
				body: request.body ? JSON.stringify(request.body) : null
			})
			if (!response.ok) {
				responseStatus = response.status
				throw new Error('There was an error fetching the request')
			}
			const data = (await response.json()) as T
			return data
		} catch (err) {
			if (err instanceof Error) {
				setTerror({ status: responseStatus, strErr: err.message || 'There was an error fetching the request' })
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, terror, requestApi }
}
