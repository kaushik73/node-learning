const mongoose = require("mongoose");
const { DATABASE } = require("../utils/constants/config");

const connectDB = async () => {
  await mongoose.connect(DATABASE.URI);
};
module.exports = connectDB;
