import { UserItem, Credentials } from "@ts-chat-app/shared";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getUserByUsername } from "./users-service";

const secret: string = process.env.JWT_SECRET || "secret";

export type TokenPayload = {
  id: string;
  username: string;
  email: string;
  sub: string;
};

export interface JwtRequest<T> extends Request<T> {
  jwt?: TokenPayload;
}

export const authenticateToken = (
  req: JwtRequest<any>,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.header("Authorization")?.split(" ")[1];

  if (token) {
    try {
      const payload = jsonwebtoken.verify(token, secret) as TokenPayload;
      req.jwt = payload;
      next();
    } catch (err) {
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("No token provided");
  }
  next();
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
  res.send(token);
  // return res.sendStatus(200);
};

const performAuthentication = async (
  credentials: Credentials
): Promise<UserItem | null> => {
  const userItem = await getUserByUsername(credentials.username);
  if (userItem && userItem.password === credentials.password) {
    //TODO: FIX AUTH WITH COMPARE
    return userItem;
  }
  return null;
};
