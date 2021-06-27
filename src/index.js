import { ApolloServer, PubSub } from "apollo-server";
import modules from "./modules";
import plugins from "./plugins";
import database from "./database";

const pubsub = new PubSub();

// Anything shared between resolvers are put into context
const server = new ApolloServer({
  plugins,
  schema: modules,
  context: ({ req }) => ({
    ...req,
    database,
    pubsub,
  }),
});

export default server;
