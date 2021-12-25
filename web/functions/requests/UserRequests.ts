import { api } from "../../config/Apis"
import { RequestResult } from "../../schemas/RequestResultSchema"
import { createRequestResult } from "../factories/RequestResultFactory"

import { UserSchemaWithTeam } from "./../../schemas/UserSchema"

export async function verifyUserRequest(url: string, token: string) {
	const response = await api.get<UserSchemaWithTeam | undefined>(url, {
		headers: {
			Authorization: token
		}
	})

	return response.data
}

export async function signInRequest(
	username: string,
	password: string
): Promise<RequestResult<{ token: string }>> {
	try {
		const response = await api.post<{ token: string }>("signin", {
			username,
			password
		})

		return createRequestResult<{ token: string }>(true, {
			data: response.data
		})
	} catch (error: any) {
		return createRequestResult(false, {
			error: error.response.data
		})
	}
}
