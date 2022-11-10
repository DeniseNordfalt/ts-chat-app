import { Router } from "express";
import {
  getUsers,
  saveUser,
  getUserById,
  getUserByUsername,
} from "../controllers/users";
import { authenticateToken } from "../controllers/auth";

const userRoutes = Router();

userRoutes.post("/", saveUser);
userRoutes.get("/", authenticateToken, getUsers);
userRoutes.get("/:username", authenticateToken, getUserByUsername);
userRoutes.get("/id/:userId", authenticateToken, getUserById);

export default userRoutes;
