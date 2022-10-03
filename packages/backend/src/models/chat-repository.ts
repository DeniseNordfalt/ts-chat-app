import MessageItem from "@ts-chat-app/shared";
import { connect, model, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: String,
  timeStamp: Date,
});

const MessageModel = model<MessageItem>("MessageItem", MessageSchema);

export const setupMongoDb = async (url: string) => {
  await connect(url);
};

export const loadAllMessageItems = async (): Promise<MessageItem[]> => {
  return MessageModel.find({}).exec();
};

export const loadMessageItem = async (
  messageId: string
): Promise<MessageItem | null> => {
  return MessageModel.findById(messageId).exec();
};

export const saveMessageItem = async (
  messageItem: MessageItem
): Promise<void> => {
  const newModel = new MessageModel(messageItem);
  newModel.save();
};