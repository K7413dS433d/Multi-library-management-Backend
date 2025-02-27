import { model, Schema, Types } from "mongoose";

//schema
const librarySchema = new Schema({
  name: { type: String, require: true, unique: true },
  location: { type: String, required: true },
  books: [{ type: Types.ObjectId, ref: "Book" }],
});

//model
export const Library = model("Library", librarySchema);
