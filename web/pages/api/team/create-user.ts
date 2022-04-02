import { hash } from "bcrypt"
import { NextApiResponse, NextApiRequest } from "next"

import { SALT_OR_ROUNDS } from "../../../config/Env"
import { UserModel } from "../../../database/models"
import { onlyAllowMethods } from "../../../functions/api/middlewares/AllowedMethodMiddleware"
import { verifyAndGetAuthUser } from "../../../functions/api/VerifyAndGetAuthUser"
import { createId } from "../../../functions/factories/IdFactory"
import { UserCreationParams } from "../../../schemas/UserSchema"

import { IDENTICON_URL } from './../../../config/Constants';
import { authenticate } from './../../../functions/api/middlewares/AuthMiddleware';

async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const allowed = onlyAllowMethods("POST")(req,res)
	if(!allowed) return

	const auth = await authenticate(req,res)
	if(!auth) return

	const { user } = auth

	if (!user.admin) {
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
		avatarUrl: userParams.avatarUrl || `${IDENTICON_URL}/${userParams.username}.png`	
	})

	await newUser.save()

	return res.status(201)
}

export default handle
