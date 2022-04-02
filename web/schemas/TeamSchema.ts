export class NewTeamSchema {
	name!: string
	admin!: {
		username: string
		password: string
	}

	static create(
		name: string,
		admin: { username: string; password: string }
	) {
		const newTeamSchema = new NewTeamSchema()
		newTeamSchema.name = name
		newTeamSchema.admin = admin
		return newTeamSchema
	}
}

export class TeamSchema {
	_id!: string
	name!: string
	imageUrl!: string

	static create(_id: string, name: string, imageUrl: string) {
		const teamSchema = new TeamSchema()
		teamSchema._id = _id
		teamSchema.name = name
		teamSchema.imageUrl = imageUrl
		return teamSchema
	}
}
