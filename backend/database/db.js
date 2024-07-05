import mongoose from "mongoose";
import "dotenv/config";

const url = process.env.DB_URL;

export const dbConnection = async () => {
  try {
    await mongoose.connect(url);
    // Issue: Local Mongo multiple Instances using docker
    // await mongoose.connect("mongodb://localhost:27017/Paytm-BE?replicaSet=rs0");
  } catch (error) {
    console.error(`Error connecting to database. ${error}`);
  }
};
