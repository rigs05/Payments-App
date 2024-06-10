import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DB_URL;

export const dbConnection = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error(`Error connecting to database. ${error}`);
  }
};
