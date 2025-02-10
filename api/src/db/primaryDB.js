const mongoose = require("mongoose");
require("dotenv").config();

const connectString = `mongodb://${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(connectString);
  }
}

module.exports = new Database();
