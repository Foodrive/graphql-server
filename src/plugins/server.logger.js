import createLogger from "../utils/logger";

const logger = createLogger({ name: "server-logger" });

const ServerLogger = {
  async serverWillStart() {
    logger.info("Server is starting...");
  },

  async serverWillStop() {
    logger.info("Server is stopping...");
  },
};

export default ServerLogger;
