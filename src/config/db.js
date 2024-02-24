// const mongoose = require("mongoose");

// const dbConnection = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URL);
//   console.log(`MongoDB connected: ${conn.connection.host}`);
// };

// module.exports = dbConnection;

const mongoose = require("mongoose");

class DatabaseSingleton {
  constructor() {
    if (!DatabaseSingleton.instance) {
      this._connect();
      DatabaseSingleton.instance = this;
    }
    return DatabaseSingleton.instance;
  }

  async _connect() {
    const dbUrl = process.env.MONGO_URL;
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  }
}

const dbInstance = new DatabaseSingleton();
Object.freeze(dbInstance);

module.exports = dbInstance;
