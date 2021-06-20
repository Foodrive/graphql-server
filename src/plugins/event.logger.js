const { ApolloLogPlugin } = require("apollo-log");

const options = {
  events: {
    didEncounterErrors: true,
    didResolveOperation: true,
    willSendResponse: true,
  },
  timestamp: true,
};

module.exports = ApolloLogPlugin(options);
