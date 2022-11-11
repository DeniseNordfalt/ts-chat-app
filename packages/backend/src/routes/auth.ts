import { Router } from "express";
import { loginUser } from "../controllers/auth";

const authRoutes = Router();

authRoutes.get("/", (req, res) => {
  res.send("Auth routes");
});
authRoutes.post("/login", loginUser);

export default authRoutes;
