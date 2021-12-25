// Constants
export const IMGBBURL = "https://api.imgbb.com"
export const IDENTICON_URL = "https://avatars.dicebear.com/api/identicon"
export const AUTH_TOKEN_KEY = "@auth/token"

export const TEAM_VALIDATION = {
	name: {
		min: 4,
		max: 12
	}
}

export const USER_VALIDATION = {
	username: {
		min: 4,
		max: 30
	},
	password: {
		min: 8,
		minNumbers: 2
	}
}
