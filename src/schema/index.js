import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./resolvers/typeDefs";
import resolvers from "./resolvers";

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
