import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User Account Schema
const accountSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number }, // Ideally type is Int with float point representation
});

export const User = model("users", userSchema);
export const Account = model("accounts", accountSchema);
