import { Transaction } from "./transaction";
import { Product } from "./product";
import { Team } from "./team";
import { User } from "./user";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
export const TeamModel = getModelForClass(Team);
export const ProductModel = getModelForClass(Product);
export const TransactionModel = getModelForClass(Transaction);
