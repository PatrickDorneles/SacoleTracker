import { prop } from "@typegoose/typegoose"

export class User {
	@prop({ type: String })
	_id!: string

	@prop({ type: String })
	username!: string

	@prop({ type: String })
	password!: string

	@prop({ type: String })
	avatarUrl?: string

	@prop({ type: Boolean, default: false })
	admin!: boolean

	@prop({ type: String })
	teamId!: string
}
