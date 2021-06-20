// Note: This is just a placeholder database
// Replace with actual database here

class PureJSDatabase {
  constructor() {
    this.items = [];
  }

  getAll() {
    return this.items;
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

module.exports = new PureJSDatabase();
