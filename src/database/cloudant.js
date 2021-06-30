import { v4 as uuidv4 } from 'uuid';
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
    // https://www.npmjs.com/package/@cloudant/cloudant - cloudant library with example db operations
    const partition = {
      async create(data) {
        return new Promise((resolve, reject) => {
          const id = uuidv4();
          const _id = `${partitionKey}:${id}`;
          const documentWithId = {...data, _id};
              database.insert(documentWithId, (err, document) => {
                if (err) {
                  logger.error(`Error occurred: ${err.message} create()`);
                  reject(err);
                } else {
                  resolve({ data: document, statusCode: 200 });
                }
              });
            });
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
        return new Promise((resolve, reject) => {
          database.partitionedList(partitionKey, (err, document) => {
            if (err) {
              logger.error(`Error occurred: ${err.message} getAll()`);
              reject(err);
            } else {
              resolve({ data: document.rows, statusCode: 200 });
            }
          });
        });
      },
      async getdById(id) {
        return new Promise((resolve, reject) => {
          const _id = `${partitionKey}:${id}`;
          database.get(_id, (err, document) => {
            if (err) {
              logger.error(`Error occurred: ${err.message} getById()`);
              reject(err);
            } else {
              resolve({ data: document, statusCode: 200 });

            }
          });
        });
      },
  }
    // bind the partition to this object so we can access database
    Object.bind(partition, this);
    return partition;
  }
}

export default CloudantDatabase;
