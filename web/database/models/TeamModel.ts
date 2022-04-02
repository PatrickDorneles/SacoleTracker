import { prop } from "@typegoose/typegoose"
import mongoose from "mongoose"

export class Team {
	@prop({ type: String })
	_id!: string

	@prop({ type: String, unique: true })
	name!: string

	@prop({ type: String })
	imageUrl!: string

	@prop({ type: mongoose.Types.Array })
	storage!: mongoose.Types.Array<{
		productId: string
		quantity: number
	}>
}
