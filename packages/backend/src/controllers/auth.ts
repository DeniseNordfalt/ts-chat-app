import { UserItem, Credentials } from "@ts-chat-app/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { loadUser } from "../models/users-repository";
import bcrypt from "bcryptjs";

const secret: string = process.env.JWT_SECRET || "secret";

export interface JwtRequest<T> extends Request<T> {
  jwt?: Credentials;
}

export const authenticateToken = async (
  req: JwtRequest<unknown>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("Authorization")?.split(" ")[1];

  if (token) {
    try {
      const payload = jsonwebtoken.verify(token, secret) as Credentials;
      req.jwt = payload;
      next();
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("No token provided");
  }
};

export const loginUser = async (req: JwtRequest<UserItem>, res: Response) => {
  const credentials = req.body;
  const user = await performAuthentication(credentials);
  if (!user) {
    return res.status(403).send("Invalid credentials");
  }
  const token = jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      sub: user.username,
    },
    secret,
    { expiresIn: "1800s" }
  );
  res.send({ token });
};

const performAuthentication = async (
  credentials: Credentials
): Promise<UserItem | null> => {
  const userItem = await loadUser(credentials.username);
  if (userItem) {
    const passwordMatch = await bcrypt.compare(
      credentials.password,
      userItem.password
    );
    if (passwordMatch) {
      return userItem;
    }
  }
  return null;
};
