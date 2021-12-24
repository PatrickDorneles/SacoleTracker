import { prop } from "@typegoose/typegoose";

export class Product {
  @prop({ type: String })
  _id!: string;

  @prop({ type: String })
  name!: string;

  @prop({ type: String })
  description!: string;

  @prop({ type: Number })
  price!: number;

  @prop({ type: String })
  imageUrl?: string;

  @prop({ type: String })
  teamId!: string;
}
