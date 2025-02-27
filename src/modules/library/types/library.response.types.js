import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { bookFieldsTypes } from "../../book/types/book.types.js";
import { responseSchema } from "../../../utils/index.utils.js";

export const addLibraryResponseType = responseSchema({
  name: "addLibraryResponse",
  dataFields: { libraryId: { type: GraphQLID } },
});

export const getLibraryResponse = responseSchema({
  name: "getLibraryResponse",
  dataFields: {
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    books: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "populatedLibWithBooksWithUser",
          fields: {
            ...bookFieldsTypes,
            author: {
              type: new GraphQLObjectType({
                name: "authorPopulatedWithInLibBooks",
                fields: {
                  name: { type: GraphQLString },
                  email: { type: GraphQLString },
                },
              }),
            },
          },
        })
      ),
    },
  },
});

export const getAllLibrariesResponse = responseSchema({
  name: "getAllLibrariesResponse",
  list: true,
  dataFields: {
    name: { type: GraphQLString },
    location: { type: GraphQLString },
  },
});
