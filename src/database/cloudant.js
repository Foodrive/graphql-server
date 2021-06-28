import createLogger from "../utils/logger";

const logger = createLogger({ name: "cloudant-database" });

// Taking the assumption that we'll only ever use one database as cloudant doesn't use tables or collections for storage
// We're using partioned database that allows for logical partionining of documents (better for performance)
// https://developer.ibm.com/tutorials/learn-nodejs-node-with-cloudant-dbaas/
// https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
// https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
const partitions = ["users", "events"];

class CloudantDatabase {
  constructor(cloudant) {
    this.database = cloudant;
    partitions.forEach((key) => {
      this[key] = this.createPartition(key, this.database);
    });
  }

  createPartition(partitionKey, database) {
    const partition = {
      async create() {
        // implement
      },
      async update(id, data) {
        return new Promise((resolve, reject) => {
          const _id = `${partitionKey}:${id}`;
          database.get(_id, (err, document) => {
            if (err) {
              reject(err);
            } else {
              const item = { ...document, ...data };
              database.insert(item, (error, result) => {
                if (error) {
                  logger.error(`Error occurred: ${error.message} update()`);
                  reject(error);
                } else {
                  resolve({ data: result, statusCode: 200 });
                }
              });
            }
          });
        });
      },
      async delete(id) {
        return new Promise((resolve, reject) => {
          const _id = `${partitionKey}:${id}`;
          database.get(_id, (err, document) => {
            if (err) {
              resolve(err.statusCode);
            } else {
              database.destroy(_id, document._rev, (e) => {
                if (e) {
                  reject(e);
                } else {
                  resolve(200);
                }
              });
            }
          });
        });
      },
      async getAll() {
        const data = await database.partitionedList(partitionKey, {
          include_docs: true,
        });
        return data.rows;
      },
      async getdById(id) {
        // implement
      },
    };
    // bind the partition to this object so we can access database
    Object.bind(partition, this);
    return partition;
  }
}

export default CloudantDatabase;
