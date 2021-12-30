import { NewTeamSchema, TeamSchema } from "../../../schemas/TeamSchema"

import { Team } from "./../../../database/models/TeamModel"

export function createNewTeamSchema(
	name: string,
	admin: { username: string; password: string }
): NewTeamSchema {
	return {
		name,
		admin
	}
}

export function createTeamSchema({ _id, name, imageUrl }: Team): TeamSchema {
	return {
		_id,
		name,
		imageUrl
	}
}
