const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const userRouter = require("../src/routes/user");
const connectDB = require("./config/database");
const User = require("./models/user");
const {
  AllowedCorosMethods,
  AllowedFrontEndURI,
  MAX_SERVER_START_TRY,
} = require("./utils/constants");
const app = express();
app.use(
  cors({
    origin: AllowedFrontEndURI,
    credentials: true,
    methods: AllowedCorosMethods,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

let retries = 0;
function startApp() {
  connectDB()
    .then(() => {
      console.log("DB Connected");
      app.listen(7777, () => {
        console.log("App running on port - 7777");
      });
    })
    .catch(async (err) => {
      console.error("Error:", err);

      if (retries < MAX_SERVER_START_TRY) {
        retries++;
        console.log(`Retrying to connect to DB... Attempt ${retries}`);
        setTimeout(startApp, 3000);
      } else {
        console.log("Max retries reached. Shutting down.");
        process.exit(1);
      }
    });
}

startApp();
