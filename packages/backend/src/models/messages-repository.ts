import { MessageItem } from "@ts-chat-app/shared";
import { connect, model, Schema } from "mongoose";

const MessageSchema = new Schema({
  text: String,
  timeStamp: Date,
});

const MessageModel = model<MessageItem>("MessageItem", MessageSchema);

//loads all messages
export const loadAllMessageItems = async (): Promise<MessageItem[]> => {
  return MessageModel.find({}).exec();
};

//loads a message by id
export const loadMessageItem = async (
  messageId: string
): Promise<MessageItem | null> => {
  return MessageModel.findById(messageId).exec();
};

//saves a new message
export const saveMessageItem = async (
  messageItem: MessageItem
): Promise<void> => {
  const newModel = new MessageModel(messageItem);

  await newModel.save();
};
