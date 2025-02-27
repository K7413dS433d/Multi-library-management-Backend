import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";

export const addBookInputType = {
  input: {
    type: new GraphQLNonNull(
      new GraphQLInputObjectType({
        name: "addBookInputType",
        fields: {
          libraryName: { type: new GraphQLNonNull(GraphQLString) },
          title: { type: new GraphQLNonNull(GraphQLString) },
          author: { type: new GraphQLNonNull(GraphQLID) },
          publishedYear: { type: new GraphQLNonNull(GraphQLInt) },
          genre: { type: new GraphQLNonNull(GraphQLString) },
          availableCopies: { type: new GraphQLNonNull(GraphQLInt) },
        },
      })
    ),
  },
};

export const getBookByIdInputType = {
  id: { type: new GraphQLNonNull(GraphQLID) },
};

export const borrowBookInputType = {
  bookId: { type: new GraphQLNonNull(GraphQLID) },
  days: { type: new GraphQLNonNull(GraphQLInt) },
};

export const returnBookInputType = {
  bookId: { type: new GraphQLNonNull(GraphQLID) },
};

export const deleteBookInputType = { bookId: { type: GraphQLID } };

export const addBookToLibInputType = {
  bookId: { type: new GraphQLNonNull(GraphQLID) },
  libName: { type: new GraphQLNonNull(GraphQLString) },
};
