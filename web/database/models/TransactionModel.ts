import { prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

type TransactionType = "ADD" | "SUB";

export class Transaction {
  @prop({ type: String })
  _id!: string;

  @prop({ type: String })
  type!: TransactionType;

  @prop({ type: mongoose.Types.Array })
  products!: mongoose.Types.Array<{
    productId: string;
    quantity: string;
  }>;
}
