const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {
  Invalid_Cred,
  LogoutSuccess,
  UserSignupSuccess,
} = require("../utils/customMessages");

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
    res.json({ message: UserSignupSuccess, data: userData });
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
      return res.status(203).json({ message: Invalid_Cred });
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      return res.json({ data: user, message: LoginSuccess });
    } else {
      return res.status(203).json({ message: Invalid_Cred });
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
    .send(LogoutSuccess);
});

module.exports = authRouter;
