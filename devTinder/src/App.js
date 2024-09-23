const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  // {
  //   "fName": "Mohit",
  //   "lName": "Pamnani",
  //   "emailId": "kaushik@gmail.com",
  //   "password": "kaushik#2@1",
  //   "gender": "Female"
  // }

  const user = new User(req.body);
  try {
    await user.save();
    res.send("User signup success");
  } catch (err) {
    res.status(400).send("Error saving user", err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.status(400).send("Error ", err);
  }
});
app.get("/user", async (req, res) => {
  try {
    const data = await User.find({ emailId: req.body.emailId });
    res.send(data);
  } catch (err) {
    res.status(400).send("Error", err);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body
    );
    res.send(data);
  } catch (err) {
    res.status(400).send("Error", err);
  }
});

app.delete("/user", async (req, res) => {
  try {
    const data = await User.findOneAndDelete({ emailId: req.body.emailId });
    res.send(data);
  } catch (err) {
    res.status(400).send("Error", err);
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
