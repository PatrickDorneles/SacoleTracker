import { TeamSchema } from "./../../../schemas/TeamSchema";
import { Team } from "./../../../database/models/TeamModel";
import { CreateTeamSchema } from "../../../schemas/TeamSchema";

export function createCreateTeamSchema(
  name: string,
  admin: { username: string; password: string }
): CreateTeamSchema {
  return {
    name,
    admin,
  };
}

export function createTeamSchema({ _id, name, imageUrl }: Team): TeamSchema {
  return {
    _id,
    name,
    imageUrl,
  };
}
