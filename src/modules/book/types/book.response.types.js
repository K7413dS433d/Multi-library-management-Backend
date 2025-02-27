import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLDate, responseSchema } from "../../../utils/index.utils.js";

export const getBookByIdResponseType = responseSchema({
  name: "getBookByIdResponse",
  dataFields: {
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    publishedYear: { type: GraphQLInt },
  },
});

export const addBookResponseType = responseSchema({
  name: "responseAddBook",
  dataFields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  },
});

export const borrowBookResponseType = responseSchema({
  name: "BorrowBookResponse",
  dataFields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    availableCopies: { type: GraphQLInt },
  },
});

export const getOverdueResponseType = responseSchema({
  list: true,
  name: "getOverdueBooksResponse",
  dataFields: {
    id: { type: GraphQLID },
    userId: {
      type: new GraphQLObjectType({
        name: "populatedUser",
        fields: {
          name: { type: GraphQLString },
          email: { type: GraphQLString },
          phone: { type: GraphQLString },
        },
      }),
    },
    bookId: {
      type: new GraphQLObjectType({
        name: "populatedBook",
        fields: {
          title: { type: GraphQLString },
          availableCopies: { type: GraphQLInt },
        },
      }),
    },
    dueDate: { type: GraphQLDate },
  },
});
