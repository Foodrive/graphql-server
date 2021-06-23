// Import plugins here
// To make own plugin, please go to
// https://www.apollographql.com/docs/apollo-server/integrations/plugins/#server-lifecycle-events
import eventLogger from "./event.logger";
import serverLogger from "./server.logger";

export default [eventLogger, serverLogger];
