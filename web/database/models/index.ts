import { getModelForClass } from "@typegoose/typegoose"

import { Product } from "./ProductModel"
import { Team } from "./TeamModel"
import { Transaction } from "./TransactionModel"
import { User } from "./UserModel"

export const UserModel = getModelForClass(User)
export const TeamModel = getModelForClass(Team)
export const ProductModel = getModelForClass(Product)
export const TransactionModel = getModelForClass(Transaction)
