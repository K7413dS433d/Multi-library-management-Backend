import { Schema, Types, model } from "mongoose";
import { preHashingData } from "./user.hooks.js";
import { transFormPhoneQuery } from "./user.transform.js";
import { roles } from "./../../../common/index.common.js";

//schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: Object.values(roles), default: roles.USER },
  password: { type: String, required: true },
  phone: { type: String, required: true, transform: transFormPhoneQuery },
  borrowedBook: [{ type: Types.ObjectId, ref: "Books" }],
});

//hooks
userSchema.pre("save", preHashingData);

//model
export const User = model("User", userSchema);
