import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { authMutation } from "./auth/auth.graph.controller.js";
import { bookMutation, bookQuery } from "./book/book.graph.controller.js";
import {
  libraryMutation,
  libraryQuery,
} from "./library/library.graph.controller.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQuery",
    description: "This is the root query for the library management system",
    fields: {
      ...bookQuery,
      ...libraryQuery,
    },
  }),

  mutation: new GraphQLObjectType({
    name: "RootMutation",
    description: "This is the root mutation for the library management system",
    fields: {
      ...authMutation,
      ...bookMutation,
      ...libraryMutation,
    },
  }),
});
