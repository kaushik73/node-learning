const mongoose = require("mongoose");
const { MongoDbURI } = require("../utils/constants");

const connectDB = async () => {
  await mongoose.connect(MongoDbURI);
};
module.exports = connectDB;
