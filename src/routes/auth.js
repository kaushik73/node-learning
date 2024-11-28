const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { GENERAL_MESSAGES } = require("../utils/constants/messages");
const { SERVER } = require("../utils/constants/config");
const { io } = require("../socket/socket");
const updateLastActiveTime = require("../middleware/updateLastActive");

authRouter.post("/signup", async (req, res) => {
  try {
    const { fName, lName, gender, age, profileURL, about, emailId, password } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fName,
      lName,
      gender,
      age,
      profileURL,
      about,
      emailId,
      password: hashPassword,
    });
    const isUserAlreadyExist = await User.findOne({ emailId: emailId });
    if (isUserAlreadyExist) {
      return res
        .status(203)
        .json({ message: GENERAL_MESSAGES.USER_ALREADY_EXIST });
    }

    const userData = await user.save();
    res
      .status(201)
      .json({ message: GENERAL_MESSAGES.USER_SIGNUP_SUCCESS, data: userData });
  } catch (err) {
    let errors = [];
    Object.keys(err.errors).forEach((key) => {
      errors.push(err.errors[key].message);
    });
    res.status(400).send(errors);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    const isPasswordCorrect = await user.validatePassword(password);

    if (!user || !isPasswordCorrect) {
      return res.status(203).json({ message: GENERAL_MESSAGES.INVALID_CRED });
    }
    user.lastActiveTime = new Date();
    await user.save(); // Save the updated user document

    const token = await user.getJWT();
    await user.setCookie(res, token);

    // io.emit("updateLastActiveTime", {
    //   userId: user._id,
    //   lastActiveTime: user.lastActiveTime,
    // });

    return res.json({ data: user, message: GENERAL_MESSAGES.LOGIN_SUCCESS });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({ message: GENERAL_MESSAGES.LOGOUT_SUCCESS });
});

module.exports = authRouter;
