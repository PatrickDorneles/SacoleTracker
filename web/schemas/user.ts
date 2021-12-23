import { User } from "./../database/schemas/user";
export type UserSchema = {
  _id: string;
  username: string;
  admin: boolean;
};

export function createUserSchema({
  _id,
  username,
  admin,
}: UserSchema | (User & { _id: any })) {
  return {
    _id,
    admin,
    username,
  };
}
