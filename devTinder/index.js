const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const app = express();

// route handler
// function which has console.log("1st funx") is basically a middleware.
// function which has console.log("2nd funx") is basically a route handler.
app.use(
  "/test",
  (_, res, next) => {
    console.log("1st funx");
    next();
  },
  (_, res, next) => {
    console.log("2nd funx");
    res.send("2nd Respose");
  }
);

// passing an array as well will work
app.use(
  "/test1",
  [
    (_, res, next) => {
      console.log("1st funx");
      next();
    },
    (_, res, next) => {
      console.log("2nd funx");
      next();
    },
    (_, res, next) => {
      console.log("3rd funx");
      next();
    },
  ],
  (_, res, next) => {
    console.log("4th funx");
    res.send("4th Response");
  }
);

// these both app.get combine is same as /test route
app.get("/test2", (_, res, next) => {
  console.log("1st funx");
  next();
});
app.get("/test2", (_, res, next) => {
  console.log("2nd funx");
  res.send("2nd Respose");
});

// middlewares :

//->  /getAllData route will 1st go to /admin then /getAllData
app.use("/admin", adminAuth);
app.get("/admin/getAllData", (_, res) => {
  console.log("getAllData");
  res.send("getAllData");
});

// one more way to write middleware

app.get("/user", userAuth, (_, res) => {
  console.log("user Data");
  res.send("user Data sent");
});

// error handling :

app.get("/test4", userAuth, (_, res) => {
  throw new Error("Edsfzgdf");
  // res.send("user Data sent");
});

//  Below is wild card error handling but we should use try-catch to handle errors
app.use("/", (err, req, res, next) => {
  err && res.status(500).send("something went wrong in any one route");
});

app.listen(7777, () => {
  console.log("app running on port - 7777");
});
