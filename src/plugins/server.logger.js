const logger = require("../utils/logger")({
  name: "server-logger",
});

const ServerLogger = {
  async serverWillStart() {
    logger.info("Server is starting...");
  },

  async serverWillStop() {
    logger.info("Server is stopping...");
  },
};

module.exports = ServerLogger;
