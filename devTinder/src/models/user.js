const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lName: {
      type: String,
      minLength: 3,
    },
    age: {
      type: Number,
      min: [18, "Age below 18 not valid"],
      max: [100, "Age above 100 not valid"],
    },

    gender: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (value) {
          if (!["male", "female", "other"].includes(value)) {
            throw new Error("Invalid Gender");
          }
        },
      },
    },
    emailId: {
      type: String,
      unique: true,
      required: [true, "email id is require"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email ID -  " + value);
        }
      },
    },
    password: {
      type: String,
      unique: true,
      minLength: 3,
      required: [true, "password is require"],
    },
    about: {
      type: String,
      default: "This is default about",
    },
    profileURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&s",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
