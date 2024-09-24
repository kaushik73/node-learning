const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res, _) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("EmailId is not present");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      res.send("Login Success");
    }
  } catch (err) {
    res.status(401).send("Error : " + err);
  }
});

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
    console.log(modifiedData);

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
