import { prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class Transaction {
  @prop({ type: String })
  _id!: string;

  @prop({ type: mongoose.Types.Array })
  products!: mongoose.Types.Array<{
    productId: string;
    quantity: string;
  }>;
}
