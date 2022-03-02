import { NextApiResponse , NextApiRequest } from 'next';

import { verifyAuthUser } from '../../../functions/api/VerifyAuthUser';

import { ProductModel } from './../../../database/models/index';
import { privateRoute } from './../../../functions/api/middlewares/AuthMiddleware';

async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

    const user = await verifyAuthUser(req)

    const products = await ProductModel.find({
        teamId: user?.teamId
    })

    return res
        .status(200)
        .json(products)
}


export default privateRoute(handle)