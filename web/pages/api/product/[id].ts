import { NextApiResponse, NextApiRequest } from "next"

export default function handle(req: NextApiRequest, res: NextApiResponse) {
	res.status(501).end()
}
