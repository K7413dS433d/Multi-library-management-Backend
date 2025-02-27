import { Library } from "../index.models.js";

// hash the password and encrypt phone
export async function preDeleteBook(next, doc) {
  const l = await Library.updateMany(
    { books: { $in: this._id } },
    { $pull: { books: this._id } }
  );
  return next();
}

