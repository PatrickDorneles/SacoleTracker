import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ type: String })
  username!: string;

  @prop({ type: String })
  password!: string;

  @prop({ type: Boolean, default: false })
  admin!: boolean;
}

export const UserModel = getModelForClass(User);
