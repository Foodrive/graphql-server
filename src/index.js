const { ApolloServer } = require("apollo-server");

const modules = require("./modules");
const plugins = require("./plugins");

// Anything shared between resolvers are put into context
const database = require("./database");

const server = new ApolloServer({
  plugins,
  schema: modules,
  context: ({ req }) => ({
    ...req,
    database,
  }),
});

module.exports = server;
