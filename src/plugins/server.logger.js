const logger = require("../utils/logger")("server-logger");

const ServerLogger = {
  async serverWillStart() {
    logger.info("Server will starting...");
  },

  async serverWillStop() {
    logger.info("Server will stopping...");
  },
};

module.exports = ServerLogger;
