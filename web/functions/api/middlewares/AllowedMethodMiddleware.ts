import { NextApiRequest, NextApiResponse } from 'next';

type ValidMethods = 
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"

export const onlyAllowMethods = (...methods: ValidMethods[]) => 
    (req: NextApiRequest, res: NextApiResponse) => {
        if(!methods.includes(req.method as ValidMethods)) {
            res.setHeader("Allow", methods)
            res.status(405).end(`Method ${req.method} Not Allowed`)
            return false
        }

        return true
}