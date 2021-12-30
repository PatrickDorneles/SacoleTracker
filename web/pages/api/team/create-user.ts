import { NextApiResponse, NextApiRequest } from "next"

import { verifyAuthUser } from "../../../functions/api/VerifyAuthUser"

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

	const admin = await verifyAuthUser(req)

	if (!admin) {
		return res.status(401).send("Usuario não authenticado")
	}

	if (!admin.admin) {
		return res
			.status(403)
			.send("Somente administradores podem criar usuarios")
	}

	res.status(501).end()
}
