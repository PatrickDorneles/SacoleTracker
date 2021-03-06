import { hash } from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"

import { IDENTICON_URL } from "../../../config/Constants"
import { SALT_OR_ROUNDS } from "../../../config/Env"
import { connectToDatabase } from "../../../database"
import { createId } from "../../../functions/factories/IdFactory"
import { NewTeamSchema } from "../../../schemas/TeamSchema"

import { TeamModel, UserModel } from "./../../../database/models"
import { onlyAllowMethods } from './../../../functions/api/middlewares/AllowedMethodMiddleware';
import { validateNewTeam } from "./../../../functions/validation/TeamValidator"

async function createTeam(req: NextApiRequest, res: NextApiResponse) {
	await connectToDatabase()

	const newTeam = req.body as NewTeamSchema
	const { admin } = newTeam

	const teamWithSameName = await TeamModel.findOne({ name: newTeam.name })

	if (teamWithSameName) {
		return res.status(400).send("Nome do time já em uso!")
	}

	const userWithSameUsernameAsAdmin = await UserModel.findOne({
		username: admin.username
	})

	if (userWithSameUsernameAsAdmin) {
		return res
			.status(400)
			.send("Nome de usuario do administrador já está em uso!")
	}

	const validationResult = validateNewTeam(newTeam)

	if (!validationResult.valid) {
		return res.status(400).send(validationResult.error.message)
	}

	const createdTeam = await TeamModel.create({
		_id: createId(),
		imageUrl: `${IDENTICON_URL}/${newTeam.name}.png`,
		name: newTeam.name
	})

	await UserModel.create({
		_id: createId(),
		username: admin.username,
		password: await hash(admin.password, SALT_OR_ROUNDS),
		avatarUrl: `${IDENTICON_URL}/${admin.username}.png`,
		admin: true,
		teamId: createdTeam._id
	})

	return res.status(201).send("Time criado com sucesso")
}

async function getAllTeams(req: NextApiRequest, res: NextApiResponse) {
	// TODO

	res.status(501).end()
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const allowed = onlyAllowMethods("POST", "GET")(req,res)
	if(!allowed) return

	switch (req.method) {
		case "POST":
			return await createTeam(req, res)
		case "GET":
			return await getAllTeams(req, res)
	}
}
