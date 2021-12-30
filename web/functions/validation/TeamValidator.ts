import { TEAM_VALIDATION, USER_VALIDATION } from "../../config/Constants"
import { NewTeamSchema } from "../../schemas/TeamSchema"

import { createValidator, getValidator } from "./Validator"

const validator = getValidator()

export const validateNewTeam = createValidator((newTeam: NewTeamSchema) => {
	const { admin } = newTeam

	if (
		!validator.isLength(newTeam.name, {
			min: TEAM_VALIDATION.name.min,
			max: TEAM_VALIDATION.name.max
		})
	) {
		const message = `Nome do time deve ter entre ${TEAM_VALIDATION.name.min} e ${TEAM_VALIDATION.name.max} caracteres`
		return {
			valid: false,
			error: {
				field: "name",
				message
			}
		}
	}

	if (
		!validator.isLength(admin.username, {
			min: USER_VALIDATION.username.min,
			max: USER_VALIDATION.username.max
		})
	) {
		const message = `Nome de usuario deve ter entre ${USER_VALIDATION.username.min} e ${USER_VALIDATION.username.max} caracteres`
		return {
			valid: false,
			error: { field: "adminUsername", message }
		}
	}

	if (
		!validator.isStrongPassword(admin.password, {
			minLength: USER_VALIDATION.password.min,
			minNumbers: USER_VALIDATION.password.minNumbers,
			minSymbols: 0,
			minUppercase: 0
		})
	) {
		const message = `Senha deve possuir pelo menos ${USER_VALIDATION.password.min} caracteres e pelo menos ${USER_VALIDATION.password.minNumbers} numeros`
		return {
			valid: false,
			error: {
				field: "adminPassword",
				message
			}
		}
	}

	return { valid: true }
})
