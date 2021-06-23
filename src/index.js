import { ApolloServer } from "apollo-server";
import Cloudant from "@cloudant/cloudant";
import modules from "./modules";
import plugins from "./plugins";
import PureJSDatabase from "./database";
import { database as dbConfig } from "./config";

const DB_NAME = "food-drive";

// Initialize the library with url and credentials.
const cloudant = Cloudant(dbConfig, (err, cloudant) => {
  if (err) {
    return console.log(`Failed to initialize Cloudant: ${err.message}`);
  }
});

// Taking the assumption that we'll only ever use one database as cloudant doesn't use tables or collections for storage
// We're using partioned database that allows for logical partionining of documents (better for performance)
// https://developer.ibm.com/tutorials/learn-nodejs-node-with-cloudant-dbaas/
// https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
// https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
const setDb = cloudant.db.use(DB_NAME);

const database = new PureJSDatabase(setDb);
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
