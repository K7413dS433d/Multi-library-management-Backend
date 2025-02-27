import { GraphQLNonNull, GraphQLString } from "graphql";

export const addLibraryInputType = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  location: { type: new GraphQLNonNull(GraphQLString) },
};

export const deleteLibraryInputType = {
  name: { type: new GraphQLNonNull(GraphQLString) },
};

export const getLibraryInputType = {
  libraryName: { type: GraphQLString },
};
