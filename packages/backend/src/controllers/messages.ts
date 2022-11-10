import { Request, Response } from "express";
import { MessageItem } from "@ts-chat-app/shared";
import {
  loadAllMessageItems,
  loadMessageItem,
  saveMessageItem,
} from "../models/messages-repository";
import { sseClients } from "../app";
import { JwtRequest } from "./auth";

// save a new message
export const saveMessage = async (
  req: JwtRequest<MessageItem>,
  res: Response<MessageItem[] | string>
): Promise<void> => {
  console.log(req.jwt);
  if (req.jwt) {
    if (req.body && req.body.text && req.body.text !== "") {
      try {
        const messageItem = req.body;
        messageItem.author = req.jwt.id;
        messageItem.username = req.jwt.username;
        messageItem.timeStamp = new Date();
        await saveMessageItem(messageItem);

        sseClients.forEach((c) => {
          c.client.write(`data: ${JSON.stringify(messageItem)}\n\n`);
        });

        const messages = await loadAllMessageItems();
        if (messages) {
          res.status(200).send(messages);
        } else {
          res.status(404).send("No messages found");
        }
      } catch (err) {
        res.status(400).send("Something went wrong!");
      }
    } else {
      res.status(400).send("Invalid message!");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

// loads a message by id
export const loadItemById = async (
  req: Request,
  res: Response<MessageItem | string>
): Promise<void> => {
  try {
    const message = await loadMessageItem(req.params.messageId);

    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json("Message not found");
    }
  } catch (e) {
    res.status(400).json("something went wrong!");
  }
};

// loads all messages
export const loadMessages = async (
  req: Request,
  res: Response<MessageItem[] | string>
): Promise<void> => {
  try {
    const messages = await loadAllMessageItems();
    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json("No messages found");
    }
  } catch (e) {
    res.status(400).json("something went wrong!");
  }
};
