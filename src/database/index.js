import Cloudant from "@cloudant/cloudant";
import { cloudant as config } from "../config";
import createLogger from "../utils/logger";
import CloudantDatabase from "./cloudant";

const logger = createLogger({
  name: "cloudant-logger",
});

const cloudantConfig = {
  account: config.cloudantId,
  plugins: {
    iamauth: {
      iamApiKey: config.apiKey,
    },
  },
};

const connectCloudantDatabase = () =>
  Cloudant(cloudantConfig, (err, cloudant) => {
    if (err) {
      logger.error(
        `Connect failure: ${err.message} for Cloudant ID: ${config.cloudantId}`
      );
      return err;
    }
    (async () => {
      try {
        const existingDbs = await cloudant.db.list();
        if (!existingDbs.includes(config.dbName)) {
          logger.info(`Database does not exist... creating: ${config.dbName}`);
          await cloudant.db.create(config.dbName);
        }
        const db = cloudant.use(config.dbName);
        logger.info(`Connection success! Connected to DB: ${config.dbName}`);
        return db;
      } catch (error) {
        logger.error(
          `Connect failure: ${err.message} for Cloudant ID: ${config.cloudantId}`
        );
        return error;
      }
    })();
  });

export default new CloudantDatabase(connectCloudantDatabase());
