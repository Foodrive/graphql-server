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

// Taking the assumption that we'll only ever use one database as cloudant doesn't use tables or collections for storage
// We're using partioned database that allows for logical partionining of documents (better for performance)
// https://developer.ibm.com/tutorials/learn-nodejs-node-with-cloudant-dbaas/
// https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
// https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
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
                await cloudant.db.create(config.dbName, { partitioned: true });
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
    const partition = {
      async find() {
        // Implement
      },
      async update() {
        // implement
      },
      async delete() {
        // implement
      },
    };

    // bind the partition to this object so we can access database
    Object.bind(partition, this);
    return partition;
  }
}

export default CloudantDatabase;
