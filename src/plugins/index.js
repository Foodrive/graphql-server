// Import plugins here
// To make own plugin, please go to
// https://www.apollographql.com/docs/apollo-server/integrations/plugins/#server-lifecycle-events
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import eventLogger from "./event.logger";
import serverLogger from "./server.logger";

export default [
  eventLogger,
  serverLogger,
  process.env.NODE_ENV === "production"
    ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
    : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
];
