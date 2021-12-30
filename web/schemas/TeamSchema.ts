export type NewTeamSchema = {
	name: string
	admin: {
		username: string
		password: string
	}
}

export type TeamSchema = {
	_id: string
	name: string
	imageUrl: string
}
