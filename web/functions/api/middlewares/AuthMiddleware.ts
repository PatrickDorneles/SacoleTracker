import { NextApiRequest, NextApiResponse } from 'next';

import { verifyAuthUser } from '../VerifyAuthUser';

type RouteFunction = (req: NextApiRequest, res: NextApiResponse) => unknown

export const privateRoute = (routeFunction: RouteFunction) => 
    (req: NextApiRequest, res: NextApiResponse) => {
        
    const user = verifyAuthUser(req)

    if(!user) {
		return res.status(401).send("Usuario não authenticado")
    }
    
    return routeFunction(req, res)
}