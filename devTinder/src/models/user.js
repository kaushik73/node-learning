const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { USER_DEFAULTS } = require("../utils/defaults");
const { ERROR } = require("../utils/messages");
const { JWT } = require("../utils/config");

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
      min: [USER_DEFAULTS.MIN_AGE, ERROR.AGE.MIN],
      max: [USER_DEFAULTS.MAX_AGE, ERROR.AGE.MAX],
    },
    gender: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (value) {
          return USER_DEFAULTS.ALLOWED_GENDERS.includes(value);
        },
        message: ERROR.GENDER,
      },
    },
    emailId: {
      type: String,
      unique: true,
      required: [true, ERROR.EMAIL.REQUIRED],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`${ERROR.EMAIL.INVALID} - ${value}`);
        }
      },
    },
    password: {
      type: String,
      minLength: 3,
      required: [true, ERROR.PASSWORD.REQUIRED],
    },
    about: {
      type: String,
      default: USER_DEFAULTS.ABOUT,
    },
    profileURL: {
      type: String,
      default: USER_DEFAULTS.IMAGE_URI,
    },
    resetPasswordOtp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;
  return jwt.sign({ _id: user._id }, JWT.SECRET_KEY, {
    expiresIn: JWT.EXPIRES_IN,
  });
};

userSchema.methods.validatePassword = function (inputPassword) {
  /*
  const user = this;
  const hashedPasswordStoredInDb = user.password;
  const isPasswordCorrect = await bcrypt.compare(
    passwordInputMyUser,
    hashedPasswordStoredInDb
  );
  return isPasswordCorrect;
  */
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("users", userSchema);
