import { NextApiRequest, NextApiResponse } from 'next';

import { verifyAndGetAuthUser } from '../VerifyAndGetAuthUser';


export const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
        
    const result = await verifyAndGetAuthUser(req)

    if(!result) {
      res.status(401).send("Usuario não authenticado")
    }

    return result
}