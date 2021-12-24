import { Transaction } from "./TransactionModel";
import { Product } from "./ProductModel";
import { Team } from "./TeamModel";
import { User } from "./UserModel";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
export const TeamModel = getModelForClass(Team);
export const ProductModel = getModelForClass(Product);
export const TransactionModel = getModelForClass(Transaction);
