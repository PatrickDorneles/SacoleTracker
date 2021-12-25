import mongoose from "mongoose";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./UserModel";

export class Team {
  @prop({ type: String })
  _id!: string;

  @prop({ type: String, unique: true })
  name!: string;

  @prop({ type: String })
  imageUrl!: string;

  @prop({ type: mongoose.Types.Array })
  storage!: mongoose.Types.Array<{
    productId: string;
    quantity: string;
  }>;
}
