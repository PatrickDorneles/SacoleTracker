import mongoose from "mongoose"

import { NODE_ENV, MONGOURI } from "../config/Env"

let isDatabaseConnected = false

export async function connectToDatabase() {
	if (isDatabaseConnected) {
		return
	}

	const databaseName = NODE_ENV
	mongoose.connect(MONGOURI, {
		dbName: databaseName
	})

	isDatabaseConnected = true
}
