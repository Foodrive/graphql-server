import { makeExecutableSchema } from "apollo-server";
import typeDefs from "./types";
import resolvers from "./resolvers";

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
