import { SALT_OR_ROUNDS } from "../../../config/Env";
import { hash } from "bcrypt";
import { TeamModel, UserModel } from "./../../../database/models";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../database";
import { CreateTeamSchema } from "../../../schemas/TeamSchema";
import { createId } from "../../../functions/factories/IdFactory";
import mongoose from "mongoose";

async function createTeam(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const body = req.body as CreateTeamSchema;
  const { admin } = body;

  const teamWithSameName = await TeamModel.findOne({ name: body.name });

  if (teamWithSameName) {
    return res.status(400).send("");
  }

  const createdTeam = await TeamModel.create({
    _id: createId(),
    name: body.name,
  });

  const createdAdmin = await UserModel.create({
    _id: createId(),
    username: admin.username,
    password: await hash(admin.password, SALT_OR_ROUNDS),
    admin: true,
    teamId: createdTeam._id,
  });

  await TeamModel.updateOne(
    { _id: createdTeam._id },
    {
      $set: {
        users: new mongoose.Types.Array([createdAdmin]),
      },
    }
  );

  return res.status(201).send("Time criado com sucesso");
}

async function getAllTeams(req: NextApiRequest, res: NextApiResponse) {}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await createTeam(req, res);
    case "GET":
      return await getAllTeams(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
