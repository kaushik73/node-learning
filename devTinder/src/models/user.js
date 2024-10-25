const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  Default_User_Image_URI,
  Default_User_About,
  JWTSecretKey,
  JWTExpireInDays,
} = require("../utils/constants");
const {
  minAgeMesssge,
  maxAgeMesssge,
  emailIdRequire,
  passwordRequire,
} = require("../utils/customMessages");

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
      min: [18, minAgeMesssge],
      max: [100, maxAgeMesssge],
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
      required: [true, emailIdRequire],
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
      required: [true, passwordRequire],
    },
    about: {
      type: String,
      default: Default_User_About,
    },
    profileURL: {
      type: String,
      default: Default_User_Image_URI,
    },
    resetPasswordOtp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, JWTSecretKey, {
    expiresIn: JWTExpireInDays,
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
