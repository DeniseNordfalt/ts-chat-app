import UserItem from "../user-item";
import {
  loadAllUserItems,
  loadUserItem,
  saveUserItem,
} from "../models/users-repository";

export const saveUser = async (userItem: UserItem): Promise<UserItem[]> => {
  if (!userItem.name || userItem.name == "") {
    throw new Error("Invalid name on user item!");
  }

  if (!userItem.password || userItem.password == "") {
    throw new Error("Invalid password on user item!");
  }

  await saveUserItem(userItem);

  return await loadAllUserItems();
};

export const loadUsers = async (): Promise<UserItem[]> => {
  return await loadAllUserItems();
};

export const loadItemById = async (userId: string): Promise<UserItem> => {
  const item = await loadUserItem(userId);

  if (!item) {
    throw new Error(`Can't find item with id ${userId}`);
  }

  return item;
};
