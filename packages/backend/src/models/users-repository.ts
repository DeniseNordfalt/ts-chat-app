import UserItem from "../user-item";
import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  password: String,
});

const UserModel = model<UserItem>("UserItem", UserSchema);

export const loadAllUserItems = async (): Promise<UserItem[]> => {
  return UserModel.find({}).exec();
};

export const loadUserItem = async (
  userId: string
): Promise<UserItem | null> => {
  return UserModel.findById(userId).exec();
};

export const saveUserItem = async (userItem: UserItem): Promise<void> => {
  const newModel = new UserModel(userItem);
  newModel.save();
};
