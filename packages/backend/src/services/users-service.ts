// import UserItem from "../user-item";
import { UserItem } from "@ts-chat-app/shared";
import {
  loadAllUserItems,
  loadUserItem,
  saveUserItem,
  loadUserItemByUsername,
} from "../models/users-repository";

export const saveUser = async (UserItem: UserItem): Promise<UserItem> => {
  if (!UserItem.username || UserItem.username == "") {
    throw new Error("Invalid name on user item!");
  }

  if (!UserItem.password || UserItem.password == "") {
    throw new Error("Invalid password on user item!");
  }

  await saveUserItem(UserItem);
  return UserItem;
};

export const getUsers = async (): Promise<UserItem[]> => {
  return await loadAllUserItems();
};

export const getUserById = async (id: string): Promise<UserItem> => {
  const item = await loadUserItem(id);

  if (!item) {
    throw new Error(`Can't find item with id ${id}`);
  }

  return item;
};

export const getUserByUsername = async (
  username: string
): Promise<UserItem | null> => {
  return await loadUserItemByUsername(username);
};
