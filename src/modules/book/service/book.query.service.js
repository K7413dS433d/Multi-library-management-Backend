import * as middlewares from "../../../middleware/index.middlewares.js";
import * as models from "../../../database/models/index.models.js";
import { transformPhonePopulated } from "../../../database/models/User/user.transform.js";
import { AppError, setResponse } from "../../../utils/index.utils.js";
import { roles } from "../../../common/index.common.js";

export async function getAllBooks(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.USER, roles.ADMIN);

  //get all books
  const allBooks = await models.Book.find();
  return setResponse({
    message: "successful",
    success: true,
    status: 200,
    data: allBooks,
  });
}

export async function getBookById(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.USER, roles.ADMIN);

  //check book is exist
  const { id } = args;
  const bookExist = await models.Book.findById(id);
  if (!bookExist) throw new AppError("book not exist", 404);

  // return bookExist;
  return setResponse({
    message: "successful",
    success: true,
    status: 201,
    data: bookExist,
  });
}

export async function getOverdueBooks(_, args, context) {
  //auth
  await middlewares.isAuthenticated(context);
  middlewares.isAuthorized(context, roles.ADMIN);

  //get overdue books
  const overdueBooks = await models.BorrowedBook.find({
    dueDate: { $lt: new Date() },
  })
    .select("-returned -borrowedAt ")
    .populate([
      {
        path: "userId",
        select: "-password -_id -borrowedBook",
        //work as middleware return the document to continue
        transform: transformPhonePopulated,
      },
      { path: "bookId", select: "-genre -publishedYear -author -_id" },
    ]);

  return setResponse({
    message: "successful",
    success: true,
    status: 200,
    data: overdueBooks,
  });
}
