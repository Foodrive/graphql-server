import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import plugins from "./plugins";
import database from "./database";
import { getUserId } from "./utils/auth";

// Anything shared between resolvers are put into context
const server = new ApolloServer({
  plugins,
  schema,
  context: ({ req }) => ({
    ...req,
    database,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

export default server;
