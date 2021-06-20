const { makeExecutableSchema } = require("apollo-server");
const typeDefs = require("./types");
const resolvers = require("./resolvers");

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
