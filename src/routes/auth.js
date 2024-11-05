const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { GENERAL_MESSAGES } = require("../utils/constants/messages");

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

authRouter.post("/login", async (req, res, _) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(203).json({ message: GENERAL_MESSAGES.INVALID_CRED });
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        secure: process.env.MODE === "production", // Ensures the cookie is only sent over HTTPS in prod
        sameSite: process.env.MODE === "production" ? "none" : false, // Allows cross-site cookies for prod
      });
      return res.json({ data: user, message: GENERAL_MESSAGES.LOGIN_SUCCESS });
    } else {
      return res.status(203).json({ message: GENERAL_MESSAGES.INVALID_CRED });
    }
  } catch (err) {
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
