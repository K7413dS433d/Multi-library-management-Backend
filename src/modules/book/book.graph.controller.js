import * as bookInputTypes from "./types/book.request.types.js";
import * as bookResponseTypes from "./types/book.response.types.js";
import * as bookQueryService from "./service/book.query.service.js";
import * as bookMutationService from "./service/book.mutation.service.js";
import { messageResponse } from "../../utils/index.utils.js";
import { listBookType } from "./types/book.types.js";

export const bookQuery = {
  getAllBooks: {
    type: listBookType,
    resolve: bookQueryService.getAllBooks,
  },

  getBookById: {
    type: bookResponseTypes.getBookByIdResponseType,
    args: {
      ...bookInputTypes.getBookByIdInputType,
    },
    resolve: bookQueryService.getBookById,
  },

  getOverdueBooks: {
    type: bookResponseTypes.getOverdueResponseType,
    resolve: bookQueryService.getOverdueBooks,
  },
};

export const bookMutation = {
  addBook: {
    type: bookResponseTypes.addBookResponseType,
    args: {
      ...bookInputTypes.addBookInputType,
    },
    resolve: bookMutationService.addBook,
  },

  borrowBook: {
    type: bookResponseTypes.borrowBookResponseType,
    args: {
      ...bookInputTypes.borrowBookInputType,
    },
    resolve: bookMutationService.borrowBook,
  },

  returnBook: {
    type: messageResponse,
    args: {
      ...bookInputTypes.returnBookInputType,
    },
    resolve: bookMutationService.returnBook,
  },

  deleteBook: {
    type: messageResponse,
    args: {
      ...bookInputTypes.deleteBookInputType,
    },
    resolve: bookMutationService.deleteBook,
  },

  addBookToLibrary: {
    type: messageResponse,
    args: {
      ...bookInputTypes.addBookToLibInputType,
    },
    resolve: bookMutationService.addBookToLibrary,
  },
};
