// Import plugins here
// To make own plugin, please go to
// https://www.apollographql.com/docs/apollo-server/integrations/plugins/#server-lifecycle-events
const eventLogger = require("./event.logger");
const serverLogger = require("./server.logger");

module.exports = [eventLogger, serverLogger];
