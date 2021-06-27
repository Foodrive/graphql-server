import { ApolloServer } from "apollo-server";
import modules from "./modules";
import plugins from "./plugins";
import CloudantDatabase from "./database";

const database = new CloudantDatabase();

// Anything shared between resolvers are put into context
const server = new ApolloServer({
  plugins,
  schema: modules,
  context: ({ req }) => ({
    ...req,
    database,
  }),
});

export default server;
