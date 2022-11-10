import { MessageItem } from "@ts-chat-app/shared";
import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  username: String,
  text: String,
  timeStamp: Date,
});

const Message = model<MessageItem>("MessageItem", MessageSchema);

// loads all messages
export const loadAllMessageItems = async (): Promise<MessageItem[]> => {
  return Message.find({}).exec();
};

// loads a message by id
export const loadMessageItem = async (
  messageId: string
): Promise<MessageItem | null> => {
  return Message.findById(messageId).exec();
};

// saves a new message
export const saveMessageItem = async (
  messageItem: MessageItem
): Promise<void> => {
  const newMessage = new Message(messageItem);

  await newMessage.save();
};
