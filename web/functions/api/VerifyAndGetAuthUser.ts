import { BeAnObject } from "@typegoose/typegoose/lib/types"
import { decode } from "jsonwebtoken"
import { Document } from "mongoose"
import { NextApiRequest } from "next"

import { connectToDatabase } from "../../database"
import { TeamModel, UserModel } from "../../database/models/index"
import { Team } from "../../database/models/TeamModel"
import { User } from "../../database/models/UserModel"

type VerificationResult = {
	user: Document<string, BeAnObject, any> & User
	team: Document<string, BeAnObject, any> & Team
} | false

export async function verifyAndGetAuthUser(req: NextApiRequest): Promise<VerificationResult> {
	connectToDatabase()
	
	const authorization = req.headers.authorization

	if (!authorization) {
		return false
	}

	const payload = decode(authorization)

	if (typeof payload !== "object" || !payload) {
		return false
	}

	const { id } = payload as { id: string }

	const user = await UserModel.findById(id)

	
	if (!user) {
		return false
	}

	const team = await TeamModel.findById(user.teamId)
	
	if (!team) {
		return false
	}

	return { user, team }
}
