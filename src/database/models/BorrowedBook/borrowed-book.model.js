import { Schema, Types, model } from "mongoose";

//schema
const borrowedBook = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  bookId: { type: Types.ObjectId, required: true, ref: "Book" },
  borrowedAt: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date, required: true },
  returned: { type: Boolean, default: false },
});

//model
export const BorrowedBook = model("BorrowedBook", borrowedBook);
