// Note: This is just a placeholder database
// Replace with actual database here

import Cloudant from "@cloudant/cloudant";
import { database as dbConfig } from "config";

const DB_NAME = "food-drive";

// Initialize the library with url and credentials.
const cloudant = Cloudant(dbConfig, (err, cloudant) => {
  if (err) {
    return console.log(`Failed to initialize Cloudant: ${err.message}`);
  }
});

// Taking the assumption that we'll only ever use one database as cloudant doesn't use tables or collections for storage
// We're using partioned database that allows for logical partionining of documents (better for performance)
// https://developer.ibm.com/tutorials/learn-nodejs-node-with-cloudant-dbaas/
// https://blog.cloudant.com/2019/05/24/Partitioned-Databases-with-Cloudant-Libraries.html
// https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-database-partitioning
const setDb = cloudant.db.use(DB_NAME);

class CloudantDatabase {
  constructor(db) {
    this.items = [];
    this.db = db;
  }

  /**
   * @param {string} partitionKey - fetch data from partition
   *
   * @return {array} array of results from the partition
   */
  getAll(partitionKey) {
    return this.db
      .partitionedList(partitionKey, { include_docs: true })
      .then((result) => result.rows);
  }

  get(index) {
    return this.items[index];
  }

  add(newItem) {
    this.items.push(newItem);
    return newItem;
  }

  edit(index, updatedItem) {
    const old = this.items[index];
    const updated = { ...old, updatedItem };
    this.items[index] = updated;
    return updated;
  }

  delete(index) {
    return this.items.splice(index, 1);
  }
}

export default CloudantDatabase;
