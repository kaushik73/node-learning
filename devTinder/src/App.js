const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    res.send(data);
  } catch (err) {
    res.status(400).send("Error " + err);
  }
});

app.get("/user", async (req, res) => {
  try {
    const data = await User.find({ emailId: req.body.emailId });
    res.send(data);
  } catch (err) {
    res.status(400).send("Error" + err);
  }
});

app.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const modifiedData = req.body;

    const ALLOWED_UPDATES = ["profileURL", "about", "gender", "age", "emailId"];
    const isUpdateAllowed = Object.keys(modifiedData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }

    const data = await User.findOneAndUpdate({ _id: userId }, modifiedData, {
      runValidators: true,
    });

    res.send(data);
  } catch (err) {
    res.status(400).send(JSON.stringify(err.message));
  }
});

app.delete("/user", async (req, res) => {
  try {
    const data = await User.findOneAndDelete({ emailId: req.body.emailId });
    res.send(data);
  } catch (err) {
    res.status(400).send("Error" + err);
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
