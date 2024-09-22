const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (_, res) => {
  const userObj = {
    fName: "Kaushik",
    lName: "jain",
    age: 23,
    emailId: "kaushik@gmail.com",
    password: "kaushik#2@1",
    gender: "Female",
  };

  const user = new User(userObj);
  try {
    await user.save();
    res.send("User signup success");
  } catch (err) {
    res.status(400).send("Error saving user", err);
  }
});

connectDB()
  .then(() => {
    console.log("DB Connected");
    app.listen(7777, () => {
      console.log("app running on port - 7777");
    });
  })
  .catch((err) => {
    console.log("error", err);
  });
