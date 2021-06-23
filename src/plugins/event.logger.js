import { ApolloLogPlugin } from "apollo-log";

const options = {
  events: {
    didEncounterErrors: true,
    didResolveOperation: true,
    willSendResponse: true,
  },
  timestamp: true,
};

export default ApolloLogPlugin(options);
