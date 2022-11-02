import { UserItem } from "@ts-chat-app/shared";
import { Router, Request, Response } from "express";
import { getUsers, saveUser, getUserById } from "../controllers/users";

const userRoutes = Router();

userRoutes.get("/", async (req: Request, res: Response<UserItem[]>) => {
  res.send(await getUsers());
});

userRoutes.get("/:userId", async (req: Request, res: Response<UserItem>) => {
  try {
    res.send(await getUserById(req.params.userId));
    console.log("User loaded", req.params.userId);
  } catch (e) {
    res.sendStatus(404);
  }
});

userRoutes.post(
  "/",
  async (req: Request<UserItem>, res: Response<UserItem>) => {
    try {
      res.send(await saveUser(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default userRoutes;
