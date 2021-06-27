import Cloudant from "@cloudant/cloudant";
import { cloudant as config } from "../config";
import createLogger from "../utils/logger";

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

const partitions = ["users", "events"];

class CloudantDatabase {
  constructor() {
    (async () => {
      this.database = await this.connect();
      partitions.forEach((key) => {
        this[key] = this.createPartition(key);
      });
    })();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      Cloudant(cloudantConfig, (err, cloudant) => {
        if (err) {
          logger.error(
            `Connect failure: ${err.message} for Cloudant ID: ${config.cloudantId}`
          );
          reject(err);
        } else {
          (async () => {
            try {
              const existingDbs = await cloudant.db.list();
              if (!existingDbs.includes(config.dbName)) {
                logger.info(
                  `Database does not exist... creating: ${config.dbName}`
                );
                await cloudant.db.create(config.dbName);
              }
              const db = cloudant.use(config.dbName);
              logger.info(
                `Connection success! Connected to DB: ${config.dbName}`
              );
              resolve(db);
            } catch (error) {
              logger.error(
                `Connect failure: ${err.message} for Cloudant ID: ${config.cloudantId}`
              );
              reject(error);
            }
          })();
        }
      });
    });
  }

  createPartition(partitionKey) {
    // return this.db
    //   .partitionedList(partitionKey, { include_docs: true })
    //   .then((result) => result.rows);
    return {
      find() {
        // Implement
      },
      update() {
        // implement
      },
      delete() {
        // implement
      },
    };
  }
}

export default CloudantDatabase;
