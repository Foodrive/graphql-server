import { ApolloServer, PubSub } from "apollo-server";
import modules from "./modules";
import plugins from "./plugins";
import database from "./database";

//connectCloudantDatabase connects to the cloudant db and returns thhe database
// Anything shared between resolvers are put into context
const server = new ApolloServer({
  plugins,
  schema: modules,
  context: ({ req }) => ({
    ...req,
    database,
    socket: PubSub,
  }),
});

export default server;
