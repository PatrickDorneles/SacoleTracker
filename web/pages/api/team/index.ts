import { hash } from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"

import { IDENTICON_URL } from "../../../config/Constants"
import { SALT_OR_ROUNDS } from "../../../config/Env"
import { connectToDatabase } from "../../../database"
import { createId } from "../../../functions/factories/IdFactory"
import { CreateTeamSchema } from "../../../schemas/TeamSchema"

import { TeamModel, UserModel } from "./../../../database/models"
import { validateNewTeam } from "./../../../functions/validation/TeamValidator"

async function createTeam(req: NextApiRequest, res: NextApiResponse) {
	await connectToDatabase()

	const body = req.body as CreateTeamSchema
	const { admin } = body

	const teamWithSameName = await TeamModel.findOne({ name: body.name })

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

	const validationResult = validateNewTeam(body)

	if (!validationResult.valid) {
		return res.status(400).send(validationResult.error.message)
	}

	const createdTeam = await TeamModel.create({
		_id: createId(),
		imageUrl: `${IDENTICON_URL}/${body.name}.png`,
		name: body.name
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
	switch (req.method) {
		case "POST":
			return await createTeam(req, res)
		case "GET":
			return await getAllTeams(req, res)
		default:
			res.setHeader("Allow", ["POST", "GET"])
			res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
