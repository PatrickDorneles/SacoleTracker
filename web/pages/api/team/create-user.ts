import { hash } from "bcrypt"
import { NextApiResponse, NextApiRequest } from "next"

import { SALT_OR_ROUNDS } from "../../../config/Env"
import { UserModel } from "../../../database/models"
import { verifyAuthUser } from "../../../functions/api/VerifyAuthUser"
import { createId } from "../../../functions/factories/IdFactory"
import { UserCreationParams } from "../../../schemas/UserSchema"

import { privateRoute } from './../../../functions/api/middlewares/AuthMiddleware';

async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const admin = await verifyAuthUser(req)

	if (!admin?.admin) {
		return res
			.status(403)
			.send("Somente administradores podem criar usuarios")
	}

	const userParams = req.body as UserCreationParams

	const hashedPassword = await hash(userParams.password, SALT_OR_ROUNDS)

	const newUser = await UserModel.create({
		id: createId(),
		username: userParams.username,
		password: hashedPassword,
		admin: userParams.admin,
		avatarUrl: userParams.avatarUrl	
	})

	await newUser.save()

}

export default privateRoute(handle)
