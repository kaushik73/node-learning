const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const userRouter = require("../src/routes/user");
const connectDB = require("./config/database");
const User = require("./models/user");
const {
  ALLOWED_CORS_METHODS,
  RETRY,
  ALLOWED_FRONTEND_URI,
  SERVER,
} = require("./utils/constants/config");

const { DB_MESSAGES } = require("./utils/constants/messages");
const app = express();

app.use(
  cors({
    origin: "*", // Allow only this origin
    // origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ALLOWED_CORS_METHODS,
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
      console.log(DB_MESSAGES.CONNECTED);
      app.listen(SERVER.PORT, () => {
        console.log(SERVER.START_MESSAGE("production", 7777));
      });
      // app.listen(SERVER.PORT, () => {
      //   process.env.status == "production"
      //     ? console.log(SERVER.START_MESSAGE(process.env.status, SERVER.PORT))
      //     : console.log(SERVER.START_MESSAGE(process.env.status, SERVER.PORT));
      // });
    })
    .catch(async (err) => {
      console.error(err);

      if (retries < RETRY.MAX_ATTEMPTS) {
        retries++;
        console.log(DB_MESSAGES.RETRY(retries));
        setTimeout(startApp, RETRY.DELAY_MS);
      } else {
        console.log(DB_MESSAGES.MAX_RETRIES_REACHED);
        process.exit(1);
      }
    });
}

module.exports = startApp;
