import { NODE_ENV } from "../config/Env";
import mongoose from "mongoose";
import { MONGOURI } from "../config/Env";

let isDatabaseConnected = false;

export async function connectToDatabase() {
  if (isDatabaseConnected) {
    return;
  }

  const databaseName = NODE_ENV;
  mongoose.connect(MONGOURI, {
    dbName: databaseName,
  });

  isDatabaseConnected = true;
}
