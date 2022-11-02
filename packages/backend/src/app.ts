import cors from "cors";
import express, { Application, json } from "express";
import dotenv from "dotenv";

import { setupMongoDb } from "./config/db";

import { randomUUID } from "crypto";
import router from "./routes";

dotenv.config();

const app: Application = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const port: number = parseInt(process.env.SERVER_PORT || "3001");
const mongoUrl: string =
  process.env.MONGODB_URL || "mongodb://localhost:27017/chat-app";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(json());

app.use("/", router);

// SSE setup
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

  console.info(`Client ${clientId} connected`);

  req.on("close", () => {
    console.log(`${clientId} Connection closed`);
    sseClients = sseClients.filter((c) => c.id !== clientId);
  });
});

//listen to the port and start the database
app.listen(port, async function () {
  await setupMongoDb(mongoUrl);
  console.log(`App is listening on port ${port} !`);
});
