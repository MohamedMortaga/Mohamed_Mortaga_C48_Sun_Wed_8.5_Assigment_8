import mongoose from "mongoose";
import { DB_URI, DB_NAME } from "../config/config.js";
import UserModel from "./model/user.model.js";
import MessageModel from "./model/message.model.js";

export async function connectDB() {
  try {
    await mongoose.connect(DB_URI, { dbName: DB_NAME });
    await UserModel.syncIndexes();
    await MessageModel.syncIndexes();
    console.log("DB Connected");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export default mongoose;
