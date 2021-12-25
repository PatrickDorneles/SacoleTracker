import type { NextApiRequest, NextApiResponse } from "next";
import { decode } from "jsonwebtoken";
import { TeamModel, UserModel } from "./../../../database/models/index";
import { connectToDatabase } from "../../../database";
import {
  createUserSchema,
  createUserSchemaWithTeam,
} from "../../../functions/factories/schema/UserFactory";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  connectToDatabase();

  const token = req.headers.authorization ?? "";

  const payload = decode(token);

  if (typeof payload !== "object" || !payload) {
    return res.json(undefined);
  }

  const { id } = payload as { id: string };
  const user = await UserModel.findById(id);

  if (!user) {
    return res.json(undefined);
  }

  const team = await TeamModel.findOne({ _id: user.teamId });

  console.log(team);

  return res.json(createUserSchemaWithTeam(user, team!));
}
