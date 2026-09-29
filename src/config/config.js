import dotenv from "dotenv";
import path from "node:path";

// NODE_ENV => DEV / PROD

dotenv.config({
  path:
    process.env.NODE_ENV == "PROD"
      ? path.resolve("./.env.prod")
      : path.resolve("./.env.dev"),
});

export const PORT = Number(process.env.PORT) || 3000;
export const DB_URI = process.env.DB_ATLAS || "";
export const DB_NAME = process.env.DB_NAME || "saraha_dev";
export const SALT_ROUND = Number(process.env.SALT_ROUND) || 12;
export const ENCRYPT_KEY = process.env.ENCRYPT_KEY || "";
