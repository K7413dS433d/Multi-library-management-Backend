import { GraphQLString } from "graphql";
import { responseSchema } from "../../../utils/index.utils.js";

export const registerUserResponseType = responseSchema({
  name: "registerUserResponse",
  dataFields: {
    id: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

export const loginUserResponseType = responseSchema({
  name: "loginUserResponse",
  dataFields: {
    token: { type: GraphQLString },
  },
});
