import { NextApiRequest, NextApiResponse } from "next";

import { ProductModel, TeamModel } from "../../../database/models";
import { onlyAllowMethods } from "../../../functions/api/middlewares/AllowedMethodMiddleware";
import { verifyAndGetAuthUser } from "../../../functions/api/VerifyAndGetAuthUser";
import { createId } from "../../../functions/factories/IdFactory";

import { IDENTICON_URL } from './../../../config/Constants';
import { authenticate } from './../../../functions/api/middlewares/AuthMiddleware';
import { ProductCreationParams } from './../../../schemas/ProductSchema';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const allowed = onlyAllowMethods("POST")(req,res)
	if(!allowed) return

	const auth = await authenticate(req,res)
	if(!auth) return

	const { user, team } = auth

    const { initialStorage, ...productProperties } = req.body as ProductCreationParams

	if(!user.admin) {
		return res
			.status(403)
			.send("Somente administradores podem criar produtos")
	}

	const productId = createId()

	const product = await ProductModel.create({
		_id: productId,
		...productProperties,
		imageUrl: `${IDENTICON_URL}/product_${productId}.png`, 
		teamId: user.teamId
	})

	await product.save()
	
	team.storage.push({
		productId,
		quantity: initialStorage
	})

	await team.save()

	return res
		.status(201)
		.json(product)
}
