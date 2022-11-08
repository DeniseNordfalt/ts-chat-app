// import UserItem from "../user-item";
import { UserItem } from "@ts-chat-app/shared";
import {
  loadAllUserItems,
  loadUserById,
  saveUserItem,
  loadUserItemByUsername,
} from "../models/users-repository";

// saves a new user
export const saveUser = async (UserItem: UserItem): Promise<UserItem> => {
  if (!UserItem.username || UserItem.username === "") {
    throw new Error("Invalid name on user item!");
  }

  if (!UserItem.password || UserItem.password === "") {
    throw new Error("Invalid password on user item!");
  }

  await saveUserItem(UserItem);
  return UserItem;
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
