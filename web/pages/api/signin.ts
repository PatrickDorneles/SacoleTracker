import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { JWTSECRET } from "../../config/Env"
import { connectToDatabase } from "../../database"

import { UserModel } from "./../../database/models/index"
import { UserSignIn } from "./../../schemas/UserSchema"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	await connectToDatabase()
	const signIn = req.body as UserSignIn

	const user = await UserModel.findOne({ username: signIn.username })

	if (!user) {
		return res.status(401).send("Usuario ou senha invalidos")
	}

	const doesPasswordsMatch = await compare(signIn.password, user.password)

	if (!doesPasswordsMatch) {
		return res.status(401).send("Usuario ou senha invalidos")
	}

	const token = sign({ id: user._id }, JWTSECRET, { expiresIn: "14d" })

	return res.status(200).send({ token })
}
