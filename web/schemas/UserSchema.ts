import { TeamSchema } from "./TeamSchema";

export type UserSchema = {
  _id: string;
  username: string;
  admin: boolean;
  avataUrl?: string;
};

export type UserSchemaWithTeam = UserSchema & {
  team: TeamSchema;
};
