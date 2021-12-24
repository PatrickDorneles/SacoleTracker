import { NODE_ENV } from "../config/Env";
import mongoose from "mongoose";
import { MONGOURI } from "../config/Env";

export async function connectToDatabase() {
  const databaseName = NODE_ENV;
  mongoose.connect(MONGOURI, {
    dbName: databaseName,
  });
}
