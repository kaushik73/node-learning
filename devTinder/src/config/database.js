const mongoose = require("mongoose");
const { DATABASE } = require("../utils/config");

const connectDB = async () => {
  await mongoose.connect(DATABASE.URI);
};
module.exports = connectDB;
