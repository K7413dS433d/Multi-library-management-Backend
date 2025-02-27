import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const registerUserInputType = {
  input: {
    type: new GraphQLNonNull(
      new GraphQLInputObjectType({
        name: "inputUserType",
        fields: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
          phone: { type: new GraphQLNonNull(GraphQLString) },
        },
      })
    ),
  },
};

export const loginUserInputType = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};
