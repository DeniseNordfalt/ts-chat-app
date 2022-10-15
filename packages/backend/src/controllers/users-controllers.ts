// import UserItem from "../user-item";
import { UserItem } from "@ts-chat-app/shared";
import { Router, Request, Response } from "express";
import { getUsers, saveUser, getUserById } from "../services/users-service";

const usersController = Router();

usersController.get("/", async (req: Request, res: Response<UserItem[]>) => {
  res.send(await getUsers());
});

usersController.get(
  "/:userId",
  async (req: Request, res: Response<UserItem>) => {
    try {
      res.send(await getUserById(req.params.userId));
      console.log("User loaded", req.params.userId);
    } catch (e) {
      res.sendStatus(404);
    }
  }
);

usersController.post(
  "/",
  async (req: Request<UserItem>, res: Response<UserItem>) => {
    try {
      res.send(await saveUser(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default usersController;
