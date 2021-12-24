import { User } from "../database/models/user";
export type UserSchema = {
  _id: string;
  username: string;
  admin: boolean;
};

export function createUserSchema({ _id, username, admin }: UserSchema | User) {
  return {
    _id,
    admin,
    username,
  };
}
