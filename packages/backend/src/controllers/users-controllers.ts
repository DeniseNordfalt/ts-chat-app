import UserItem from "../user-item";
import { Router, Request, Response } from "express";
import { loadItemById, loadUsers, saveUser } from "../services/users-service";

const usersController = Router();

usersController.get("/", async (req: Request, res: Response<UserItem[]>) => {
  res.send(await loadUsers());
});

usersController.get(
  "/:userId",
  async (req: Request, res: Response<UserItem>) => {
    try {
      res.send(await loadItemById(req.params.userId));
    } catch (e) {
      res.sendStatus(404);
    }
  }
);

usersController.post(
  "/",
  async (req: Request<UserItem>, res: Response<UserItem[]>) => {
    try {
      res.send(await saveUser(req.body));
    } catch (e) {
      res.sendStatus(400);
    }
  }
);

export default usersController;
