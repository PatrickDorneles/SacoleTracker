import validator from "validator"

import { ValidationResult } from "./../../schemas/ValidationResultSchema"

export function getValidator() {
	return validator
}

export function createValidator<T>(
	validatorFunction: (validationObject: T) => ValidationResult
) {
	return validatorFunction
}
