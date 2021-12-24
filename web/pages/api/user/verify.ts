import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "jsonwebtoken";
import { UserModel } from "./../../../database/models/index";
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
