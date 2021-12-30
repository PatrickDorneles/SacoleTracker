import { decode } from "jsonwebtoken"
import { NextApiRequest } from "next"

import { UserModel } from "../../database/models/index"

export async function verifyAuthUser(req: NextApiRequest) {
	const authorization = req.headers.authorization

	if (!authorization) {
		return undefined
	}

	const payload = decode(authorization)

	if (typeof payload !== "object" || !payload) {
		return undefined
	}

	const { id } = payload as { id: string }

	const user = await UserModel.findById(id)

	if (!user) {
		return undefined
	}

	return user
}
