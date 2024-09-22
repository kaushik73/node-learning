const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
