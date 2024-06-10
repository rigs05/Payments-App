import express from "express";
import cors from "cors";
const app = express();
import { dbConnection } from "./database/db.js";
const PORT = 3000;

const serverConnection = async () => {
  try {
    await dbConnection().then(() => {
      console.log("Connection to database successful.");
    });

    app.use(express.json());
    app.use(cors());

    const connection = app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT}`);
    });
    connection.on("error", (err) => {
      return console.error(`Error occured while connecting to server. ${err}`);
    });
  } catch (err) {
    console.error(`Error connecting to server connection. ${err}`);
  }
};

serverConnection();
