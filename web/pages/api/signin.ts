import type { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserModel } from "./../../database/models/index";
import { connectToDatabase } from "../../database";

const JWTSECRET = process.env.JWTSECRET!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await signIn(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function signIn(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const body = JSON.parse(req.body) as { username: string; password: string };

  console.log(body);

  const user = await UserModel.findOne({ username: body.username });

  if (!user) {
    return res.status(401).send("Usuario ou senha invalidos");
  }

  const doesPasswordsMatch = await compare(body.password, user.password);

  if (!doesPasswordsMatch) {
    return res.status(401).send("Usuario ou senha invalidos");
  }

  const token = sign({ id: user._id }, JWTSECRET, { expiresIn: "14d" });

  return res.status(200).send({ token });
}
