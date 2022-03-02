import { NextApiRequest, NextApiResponse } from "next";

import { ProductModel } from "../../../database/models";
import { verifyAuthUser } from "../../../functions/api/VerifyAuthUser";
import { createId } from "../../../functions/factories/IdFactory";

import { IDENTICON_URL } from './../../../config/Constants';
import { privateRoute } from './../../../functions/api/middlewares/AuthMiddleware';
import { ProductCreationParams } from './../../../schemas/ProductSchema';

async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"])
		res.status(405).end(`Method ${req.method} Not Allowed`)
		return
	}

    const productParams = req.body as ProductCreationParams

	const user = await verifyAuthUser(req)

	if(!user?.admin) {
		return res
			.status(403)
			.send("Somente administradores podem criar produtos")
	}

	const productId = createId()

	const product = await ProductModel.create({
		_id: productId,
		...productParams,
		imageUrl: `${IDENTICON_URL}/product_${productId}.png`, 
		teamId: user.teamId
	})

	await product.save()

	return res
		.status(201)
		.json(product)
}

export default privateRoute(handle)