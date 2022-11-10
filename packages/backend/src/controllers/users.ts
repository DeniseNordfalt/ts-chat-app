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
export const saveUser = async (
  req: Request<UserItem>,
  res: Response<string>
) => {
  const user = req.body;
  if (!user.username || user.username === "") {
    return res.status(400).json("Invalid name on user item!");
  }
  if (!user.email || user.email === "") {
    return res.status(400).json("Invalid email on user item!");
  }
  if (!user.password || user.password === "") {
    return res.status(400).json("Invalid password on user item!");
  } else {
    try {
      await saveUserItem(req.body);
      res.status(201).json("User created");
    } catch (e) {
      res.status(400).json("Please provide unique username and email");
    }
  }
};

// loads all users
export const getUsers = async (
  req: Request,
  res: Response<UserItem[] | string>
): Promise<void> => {
  try {
    const users = await loadAllUserItems();
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json("No users found");
    }
  } catch (e) {
    res.status(400).json("something went wrong!");
  }
};

// loads a user by id
export const getUserById = async (
  req: Request,
  res: Response<UserItem | string>
): Promise<UserItem | void> => {
  const id = req.params.userId;
  try {
    const user = await loadUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(400).json("Something went wrong!");
  }
};

// loads a user by username
export const getUserByUsername = async (
  req: Request,
  res: Response<UserItem | string>
): Promise<UserItem | void> => {
  const username = req.params.username;
  try {
    const user = await loadUserItemByUsername(username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (e) {
    res.status(400).json("Something went wrong!");
  }
};
