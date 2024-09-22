const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  age: Number,
  gender: String,
  emailId: String,
  password: String,
});

module.exports = mongoose.model("users", userSchema);
