import { makeExecutableSchema } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
