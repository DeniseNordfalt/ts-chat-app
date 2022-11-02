import { MessageItem } from "@ts-chat-app/shared";
import { Router, Request, Response } from "express";
import {
  loadItemById,
  loadMessages,
  saveMessage,
} from "../controllers/messages";

const messageRoutes = Router();
messageRoutes;
messageRoutes.get("/", async (req: Request, res: Response<MessageItem[]>) => {
  res.send(await loadMessages());
});

messageRoutes.get(
  "/:messageId",
  async (req: Request, res: Response<MessageItem>) => {
    try {
      res.send(await loadItemById(req.params.messageId));
    } catch (e) {
      res.sendStatus(404);
    }
  }
);

messageRoutes.post(
  "/",
  async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
    try {
      res.send(await saveMessage(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default messageRoutes;
