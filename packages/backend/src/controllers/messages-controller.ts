import MessageItem from "@ts-chat-app/shared";
import express, { Router, Request, Response } from "express";
import {
  loadItemById,
  loadMessages,
  saveMessage,
} from "../services/messages-service";

const messagesController = express.Router();

messagesController.get(
  "/",
  async (req: Request, res: Response<MessageItem[]>) => {
    res.send(await loadMessages());
  }
);

messagesController.get(
  "/:messageId",
  async (req: Request, res: Response<MessageItem>) => {
    try {
      res.send(await loadItemById(req.params.messageId));
    } catch (e) {
      res.sendStatus(404);
    }
  }
);

messagesController.post(
  "/",
  async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
    try {
      res.send(await saveMessage(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default messagesController;
