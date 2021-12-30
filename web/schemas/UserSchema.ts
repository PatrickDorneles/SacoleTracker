import { TeamSchema } from "./TeamSchema"

export type UserSchema = {
	_id: string
	username: string
	admin: boolean
	avatarUrl?: string
}

export type UserSchemaWithTeam = UserSchema & {
	team: TeamSchema
}

export type UserSignIn = {
	username: string
	password: string
}
