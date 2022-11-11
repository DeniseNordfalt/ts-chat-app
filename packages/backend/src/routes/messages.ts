import { Router } from "express";
import {
  loadItemById,
  loadMessages,
  saveMessage,
} from "../controllers/messages";
import { authenticateToken } from "../controllers/auth";

const messageRoutes = Router();

messageRoutes.get("/", authenticateToken, loadMessages);
messageRoutes.post("/", authenticateToken, saveMessage);
messageRoutes.get("/:messageId", authenticateToken, loadItemById);

export default messageRoutes;
