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
