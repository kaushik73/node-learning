const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

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
    await user.save();
    res.send("User signup success");
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
      throw new Error("EmailId is not present");
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if (isPasswordCorrect) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Success");
    } else {
      throw new Error("Invalid Cred");
    }
  } catch (err) {
    res.status(401).send("Error : " + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("logout success");
});

module.exports = authRouter;
