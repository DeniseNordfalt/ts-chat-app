import { Router } from "express";
import userRoutes from "./users";
import messageRoutes from "./messages";
import authRoutes from "./auth";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Server is running!");
});

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/messages", messageRoutes);

export default routes;
