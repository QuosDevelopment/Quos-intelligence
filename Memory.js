class Memory {
  constructor() {
    this.storage = {};
  }

  remember(key, value) {
    this.storage[key] = value;
    return value;
  }

  recall(key) {
    return this.storage[key] || null;
  }

  forget(key) {
    delete this.storage[key];
  }

  getAll() {
    return this.storage;
  }
}

module.exports = Memory;