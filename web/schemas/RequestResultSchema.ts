interface ResultError {
	success: false
	error: string
}

interface ResultSuccess<T> {
	success: true
	data: T
}

export type RequestResult<T> = ResultError | ResultSuccess<T>
