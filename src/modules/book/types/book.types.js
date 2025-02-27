import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { responseSchema } from "../../../utils/index.utils.js";

export const bookFieldsTypes = {
  id: { type: GraphQLID },
  title: { type: GraphQLString },
  author: { type: GraphQLString },
  publishedYear: { type: GraphQLInt },
  genre: { type: GraphQLString },
  availableCopies: { type: GraphQLInt },
};

export const listBookType = responseSchema({
  list: true,
  name: "bookListResponse",
  dataFields: bookFieldsTypes,
});
