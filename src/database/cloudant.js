import { v4 as uuidv4 } from "uuid";
import createLogger from "utils/logger";

const logger = createLogger({ name: "cloudant-database" });

// Taking the assumption that we'll only ever use one database as cloudant doesn't use tables or collections for storage
// We're using partioned database that allows for logical partionining of documents (better for performance)
// https://developer.ibm.com/tutorials/learn-nodejs-node-with-cloudant-dbaas/
// https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
// https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
const partitions = ["users", "events", "invitations"];

class CloudantDatabase {
  constructor(cloudant) {
    this.database = cloudant;
    partitions.forEach((key) => {
      this[key] = this.createPartition(key, this.database);
    });
  }

  createPartition(partitionKey, database) {
    // https://www.npmjs.com/package/@cloudant/cloudant - cloudant library with example db operations
    const partition = {
      async create(data, insertId = true) {
        return new Promise((resolve, reject) => {
          const id = uuidv4();
          const _id = `${partitionKey}:${id}`;
          const documentWithId = { ...data, _id };
          if (insertId) {
            documentWithId.id = id;
          }
          database.insert(documentWithId, (err) => {
            if (err) {
              logger.error(`Error occurred: '${err.message}' in create()`);
              reject(err);
            } else {
              resolve({ data: documentWithId, statusCode: 200 });
            }
          });
        });
      },
      async update(id, data, merge = true) {
        return new Promise((resolve, reject) => {
          const _id = `${partitionKey}:${id}`;
          database.get(_id, (err, document) => {
            if (err) {
              reject(err);
            } else {
              let item;
              if (merge) {
                // Remove all undefined fields. Fields can still be nullable
                const cleanedData = Object.keys(data).reduce((acc, key) => {
                  if (data[key] === undefined) {
                    return acc;
                  }
                  return {
                    ...acc,
                    [key]: data[key],
                  };
                }, {});
                item = { ...document, ...cleanedData };
              } else {
                item = { ...data };
              }
              database.insert(item, (error) => {
                if (error) {
                  logger.error(
                    `Error occurred: '${error.message}' in update()`
                  );
                  reject(error);
                } else {
                  resolve({ data: item, statusCode: 200 });
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
              database.destroy(_id, document._rev, (error, response) => {
                if (error) {
                  logger.error(
                    `Error occurred: '${error.message}' in delete()`
                  );
                  reject(error);
                } else {
                  resolve({ data: response.ok, statusCode: 200 });
                }
              });
            }
          });
        });
      },

      async find(query) {
        const selector = { ...query };
        return new Promise((resolve, reject) => {
          database.partitionedFind(
            partitionKey,
            {
              selector,
            },
            (err, document) => {
              if (err) {
                logger.error(`Error occurred: '${err.message}' in find()`);
                reject(err);
              } else {
                resolve({ data: document.docs, statusCode: 200 });
              }
            }
          );
        });
      },

      async getAll() {
        return new Promise((resolve, reject) => {
          database.partitionedFind(
            partitionKey,
            {
              selector: {},
            },
            (err, document) => {
              if (err) {
                logger.error(`Error occurred: ${err.message} getAll()`);
                reject(err);
              } else {
                resolve({ data: document.docs, statusCode: 200 });
              }
            }
          );
        });
      },

      async getById(id, includesPartitionKey = false) {
        return new Promise((resolve, reject) => {
          let _id = id;
          if (!includesPartitionKey) {
            _id = `${partitionKey}:${id}`;
          }
          database.get(_id, (err, document) => {
            if (err) {
              logger.error(`Error occurred: '${err.message}' in getById()`);
              reject(err);
            } else {
              resolve({ data: document, statusCode: 200 });
            }
          });
        });
      },
    };
    // bind the partition to this object so we can access database
    Object.bind(partition, this);
    return partition;
  }
}

export default CloudantDatabase;
