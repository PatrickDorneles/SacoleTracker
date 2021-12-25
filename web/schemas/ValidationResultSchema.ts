type InvalidResult = {
	valid: false
	error: { field: string; message: string }
}

type ValidResult = {
	valid: true
}

export type ValidationResult = ValidResult | InvalidResult
