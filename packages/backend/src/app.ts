import cors from "cors";
import express, { Application, json } from "express";
import dotenv from "dotenv";
import messagesController from "./controllers/messages-controller";
import { setupMongoDb } from "./config/db";

import usersController from "./controllers/users-controllers";
import { authenticateToken, loginUser } from "./services/auth";

dotenv.config();

const app: Application = express();
app.use(cors()); // TODO Configure CORS properly to make the app secure.
app.use(json());
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat-app";

app.post("/login", loginUser);
//TODO: MOVE OUT

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/messages", messagesController);
app.use("/users", usersController);

app.listen(port, async function () {
  await setupMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
