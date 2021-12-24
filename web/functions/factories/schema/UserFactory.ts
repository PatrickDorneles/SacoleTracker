import { User } from "../../../database/models/UserModel";
import { UserSchema } from "../../../schemas/UserSchema";

export function createUserSchema({
  _id,
  username,
  admin,
}: UserSchema | User): UserSchema {
  return {
    _id,
    admin,
    username,
  };
}
