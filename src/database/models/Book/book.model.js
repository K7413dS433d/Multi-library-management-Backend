import { Schema, model, Types } from "mongoose";
import { preDeleteBook } from "./book.hooks.js";

//schema
const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: Types.ObjectId, required: true, ref: "User" },
  publishedYear: { type: Date, required: true },
  genre: { type: String, required: true },
  availableCopies: {
    type: Number,
    required: true,
    min: [0, "there is no available copies to borrow"],
  },
});

bookSchema.pre("deleteOne", { document: true, query: false }, preDeleteBook);
//model
export const Book = model("Book", bookSchema);
