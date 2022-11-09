// import UserItem from "../user-item";
import { Request, Response } from "express";
import { UserItem } from "@ts-chat-app/shared";
import {
  loadAllUserItems,
  loadUserById,
  saveUserItem,
  loadUserItemByUsername,
} from "../models/users-repository";

// saves a new user
// export const saveUser = async (UserItem: UserItem): Promise<UserItem> => {
//   if (!UserItem.username || UserItem.username === "") {
//     throw new Error("Invalid name on user item!");
//   }
//   if (!UserItem.password || UserItem.password === "") {
//     throw new Error("Invalid password on user item!");
//   }
//   try {
//     const user = await saveUserItem(UserItem);
//     return user;
//   } catch (e) {
//     throw new Error("Username already exists!");
//   }
// };

export const saveUser = async (
  req: Request<UserItem>,
  res: Response<string>
): Promise<void> => {
  const user = req.body;
  if (!user.username || user.username === "") {
    res.status(400).json("Invalid name on user item!");
  }
  if (!user.email || user.email === "") {
    res.status(400).json("Invalid email on user item!");
  }
  if (!user.password || user.password === "") {
    res.status(400).json("Invalid password on user item!");
  } else {
    try {
      await saveUserItem(req.body);
      res.status(201).json("User created");
    } catch (e) {
      res.status(400).json("Something went wrong!");
    }
  }
};

// loads all users
export const getUsers = async (): Promise<UserItem[]> => {
  return await loadAllUserItems();
};

// loads a user by id
export const getUserById = async (id: string): Promise<UserItem> => {
  const item = await loadUserById(id);

  if (!item) {
    throw new Error(`Can't find item with id ${id}`);
  }

  return item;
};

// loads a user by username
export const getUserByUsername = async (
  username: string
): Promise<UserItem | null> => {
  return await loadUserItemByUsername(username);
};
