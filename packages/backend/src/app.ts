import cors from "cors";
import express, { Application, json } from "express";
import dotenv from "dotenv";
import messagesController from "./controllers/messages-controller";
import { setupMongoDb } from "./config/db";

import usersController from "./controllers/users-controllers";
import { authenticateToken, loginUser } from "./services/auth";
import { randomUUID } from "crypto";

dotenv.config();

const app: Application = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
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

type SseClient = {
  id: string;
  client: express.Response;
};

export let sseClients: SseClient[] = [];

app.use("/sse", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const clientId = randomUUID();
  const newClient: SseClient = {
    id: clientId,
    client: res,
  };

  sseClients.push(newClient);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    sseClients = sseClients.filter((c) => c.id !== clientId);
  });
});

app.listen(port, async function () {
  await setupMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
