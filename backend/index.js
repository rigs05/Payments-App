import express from "express";
import cors from "cors";
const app = express();
import { dbConnection } from "./database/db.js";
import routes from "./routes/index.js";
import "dotenv/config";
const PORT = process.env.PORT;

const serverConnection = async () => {
  try {
    await dbConnection().then(() => {
      console.log("Connection to database successful.");
    });

    app.use(express.json());
    app.use(cors());
    app.use("/api/v1", routes);

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
