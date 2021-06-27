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
       create() {
         // impllement
        // console.log(database);
        // database.partitionedList('canidae', { include_docs: true });
      },
      async update() {
        // implement
      },
      async delete() {
        // implement
      },
      async find() {
        // impelment
        // return this.database
        //   .partitionedList(partitionKey, { include_docs: true })
        //   .then((result) => result.rows);
      },
    };
    // bind the partition to this object so we can access database
    Object.bind(partition, this);
    return partition;
  }
}

export default CloudantDatabase;
