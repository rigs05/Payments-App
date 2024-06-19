import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const accountSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number }, // Ideally type is Int with float point representation
});

export const User = model("users", userSchema);
export const Account = model("account", accountSchema);
