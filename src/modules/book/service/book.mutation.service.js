import * as middlewares from "../../../middleware/index.middlewares.js";
import * as models from "../../../database/models/index.models.js";
import { AppError, setResponse } from "../../../utils/index.utils.js";
import { roles } from "../../../common/index.common.js";

export async function addBook(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const newBook = new models.Book(args.input);

  //adding book to library
  const libExist = await models.Library.findOneAndUpdate(
    { name: args.input.libraryName },

    { $push: { books: newBook.id } }
  );
  if (!libExist) throw new AppError("Library not exist", 404);

  //save the book to db
  await newBook.save();

  return setResponse({
    status: 201,
    success: true,
    message: `Book added to library ${args.input.libraryName}`,
    data: {
      id: newBook.id,
      title: newBook.title,
    },
  });
}

export async function borrowBook(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.USER, roles.ADMIN);

  //get book id
  const { bookId, days } = args;

  //check book exist
  const bookExist = await models.Book.findById(bookId);
  if (!bookExist) throw new AppError("book not found", 404);

  //check if borrow this book and do not return it yet
  const isBorrowed = await models.BorrowedBook.findOne({
    userId: context.user.id,
    bookId,
    returned: false,
  });

  if (isBorrowed)
    throw new AppError("User cannot borrow this book before return it");

  //check if there is copies available to borrow
  if (bookExist.availableCopies <= 0)
    throw new AppError("there is no available copies to borrow", 409);

  bookExist.availableCopies -= 1;
  await bookExist.save();

  //add the borrowed entry to borrowed table
  const newBorrowedEntry = new models.BorrowedBook({
    userId: context.user.id,
    bookId: bookExist.id,
    dueDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  });
  await newBorrowedEntry.save();

  return setResponse({
    success: true,
    status: 200,
    message: `Book ${bookExist.title} is borrowed by you MR: ${context.user.name} `,
    data: {
      id: bookExist.id,
      title: bookExist.title,
      availableCopies: bookExist.availableCopies,
    },
  });
}

export async function returnBook(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.USER, roles.ADMIN);

  //get book id
  const { bookId } = args;

  const bookExist = await models.Book.findById(bookId);
  if (!bookExist) throw new AppError("book not found", 404);

  //check if book borrowed and mark it as returned
  const borrowedBookExist = await models.BorrowedBook.findOneAndUpdate(
    {
      userId: context.user.id,
      bookId,
      returned: false,
    },
    { returned: true }
  );
  if (!borrowedBookExist) throw new AppError("book not borrowed", 409);

  //update quantity
  bookExist.availableCopies += 1;
  await bookExist.save();

  return setResponse({
    status: 200,
    message: "You returned this book thank you.",
  });
}

export async function deleteBook(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const { bookId } = args;

  //check book is exist
  const bookExist = await models.Book.findById(bookId);
  if (!bookExist) throw new AppError("book not exist", 404);

  //delete from box collection
  await bookExist.deleteOne();

  return setResponse({
    status: 200,
    message: "book deleted successfully",
  });
}

export async function addBookToLibrary(_, args, context) {
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  const { bookId, libName } = args;

  const existResult = await Promise.all([
    models.Library.findOne({ name: libName }),
    models.Book.findById(bookId),
  ]);

  if (!existResult[0] || !existResult[1])
    throw new AppError("wrong libName or bookId", 400);
  console.log(existResult);

  if (existResult[0].books.includes(existResult[1]._id))
    throw new AppError(
      `book ${existResult[1].title} is already in ${existResult[0].name}`
    );

  //add book to library
  existResult[0].books.push(existResult[1]._id);
  await existResult[0].save();

  return setResponse({
    status: 200,
    message: `book ${existResult[1].title} is added to ${existResult[0].name}`,
  });
}
