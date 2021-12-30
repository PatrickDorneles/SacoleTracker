import { Team } from "../../../database/models/TeamModel"
import { User } from "../../../database/models/UserModel"
import { UserSchema, UserSchemaWithTeam } from "../../../schemas/UserSchema"

import { createTeamSchema } from "./TeamFactory"

export function createUserSchema({ _id, username, admin }: User): UserSchema {
	return {
		_id,
		admin,
		username
	}
}

export function createUserSchemaWithTeam(
	{ _id, username, admin, avatarUrl }: User,
	team: Team
): UserSchemaWithTeam {
	const teamSchema = createTeamSchema(team)

	return {
		_id,
		username,
		admin,
		avatarUrl,
		team: teamSchema
	}
}
