// Note: This is just a placeholder database
// Replace with actual database here

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
