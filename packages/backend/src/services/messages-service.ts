import MessageItem from "@ts-chat-app/shared";
import {
  loadAllMessageItems,
  loadMessageItem,
  saveMessageItem,
} from "../models/messages-repository";

export const saveMessage = async (
  messageItem: MessageItem
): Promise<MessageItem[]> => {
  if (!messageItem.text || messageItem.text == "") {
    throw new Error("Invalid text on message item!");
  }

  messageItem.timeStamp = new Date();

  await saveMessageItem(messageItem);

  return await loadAllMessageItems();
};

export const loadMessages = async (): Promise<MessageItem[]> => {
  return await loadAllMessageItems();
};

export const loadItemById = async (messageId: string): Promise<MessageItem> => {
  const item = await loadMessageItem(messageId);

  if (!item) {
    throw new Error(`Can't find item with id ${messageId}`);
  }

  return item;
};
