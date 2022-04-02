import { NextApiResponse , NextApiRequest } from 'next';

import { onlyAllowMethods } from '../../../functions/api/middlewares/AllowedMethodMiddleware';

import { ProductModel } from './../../../database/models/index';
import { authenticate } from './../../../functions/api/middlewares/AuthMiddleware';
import { BasicProduct } from './../../../schemas/ProductSchema';

async function handle(req: NextApiRequest, res: NextApiResponse) {
	const allowed = onlyAllowMethods("GET")(req,res)
    if(!allowed) return

    const auth = await authenticate(req, res)
    if(!auth) return

    const { user, team } = auth

    const products = await ProductModel.find({
        teamId: user.teamId
    })

    const mappedProducts = products.map(product => BasicProduct.create(product, team))

    return res
        .status(200)
        .json(mappedProducts)
}


export default handle