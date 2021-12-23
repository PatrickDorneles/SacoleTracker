import { UserModel } from "./../../../database/schemas/user";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "jsonwebtoken";
import { connectToDatabase } from "../../../database";
import { createUserSchema } from "../../../schemas/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectToDatabase();

  const token = req.headers.authorization ?? "";

  const payload = decode(token);

  if (typeof payload !== "object" || !payload) {
    return res.json(undefined);
  }

  const { id } = payload as { id: string };
  const user = await UserModel.findById(id);

  return res.json(createUserSchema(user!));
}
