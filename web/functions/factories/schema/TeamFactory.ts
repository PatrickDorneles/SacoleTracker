import { TeamSchema } from "../../../schemas/TeamSchema"

import { Team } from "./../../../database/models/TeamModel"

export function createTeamSchema({ _id, name, imageUrl }: Team): TeamSchema {
	return {
		_id,
		name,
		imageUrl
	}
}
