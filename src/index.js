import { ApolloServer, PubSub } from "apollo-server";
import modules from "./modules";
import plugins from "./plugins";
import { connectCloudantDatabase } from "./database";
import  CloudantDatabase from "./database/cloudant";


//connectCloudantDatabase connects to the cloudant db and returns thhe database
const database = new CloudantDatabase(connectCloudantDatabase());
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
