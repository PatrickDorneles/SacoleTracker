import { User } from "./user";
import mongoose from "mongoose";
import { prop, Ref } from "@typegoose/typegoose";

export class Team {
  @prop({ type: String })
  _id!: string;

  @prop({ type: String })
  name!: string;

  @prop({ ref: () => User, default: [] })
  users!: mongoose.Types.Array<Ref<User>>;

  @prop({ type: mongoose.Types.Array })
  storage!: mongoose.Types.Array<{
    productId: string;
    quantity: string;
  }>;
}
