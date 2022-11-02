import { UserItem } from "@ts-chat-app/shared";
import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// hashes the password before saving the user
userSchema.pre(/save/, async function (next): Promise<void> {
  if (this.modifiedPaths().includes("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

//saves the user to the database
export const saveUserItem = async (user: UserItem): Promise<UserItem> => {
  const newUser = await User.create(user);
  return newUser;
};

const User = model<UserItem>("UserItem", userSchema);

//for verification
export const loadUser = async (username: string): Promise<UserItem | null> => {
  return User.findOne({ username: username }).exec();
};

// loads all users
export const loadAllUserItems = async (): Promise<UserItem[]> => {
  return User.find({}, { password: 0 }).exec();
};

//loads a user by id
export const loadUserById = async (
  userId: string
): Promise<UserItem | null> => {
  return User.findById(userId, { password: 0 }).exec();
};

//loads a user by username
export const loadUserItemByUsername = async (
  username: string
): Promise<UserItem | null> => {
  return await User.findOne({ username: username }, { password: 0 }).exec();
};
