const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
      minLength: 3,
      index: true,
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
    resetPasswordOtp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};
userSchema.methods.validatePassword = async function (passwordInputMyUser) {
  const user = this;
  const hashedPasswordStoredInDb = user.password;
  const isPasswordCorrect = await bcrypt.compare(
    passwordInputMyUser,
    hashedPasswordStoredInDb
  );

  return isPasswordCorrect;
};

module.exports = mongoose.model("users", userSchema);
