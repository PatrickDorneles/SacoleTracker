import { hash, hashSync } from "bcrypt";
import mongoose from "mongoose";

export async function connectToDatabase() {
  const mongoUri = process.env.DATABASEURI ?? "";
  mongoose.connect(mongoUri, {
    dbName: "test",
  });
}
