import { GraphQLScalarType, Kind } from "graphql";

export const GraphQLDate = new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar type for Date (YYYY-MM-DD format)",
  //   before send data
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
    }
    return null;
  },
  //   parse coming data
  parseValue(value) {
    return new Date(value); // Convert input string to Date object
  },
  // Parses input date strings from GraphQL queries.
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert input string to Date object
    }
    return null;
  },
});
