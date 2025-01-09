const dotenv = require("dotenv");
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: envFile });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const userRouter = require("../src/routes/user");
const messageRouter = require("../src/routes/message");

const connectDB = require("./config/database");
const { app, server } = require("./socket/socket");

const { DB_MESSAGES } = require("./utils/constants/messages");
const {
  ALLOWED_CORS_METHODS,
  RETRY,
  ALLOWED_FRONTEND_URI,
  SERVER,
} = require("./utils/constants/config");

app.use(
  cors({
    origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // ALLOWED_CORS_METHODS,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors()); // Enable preflight across-the-board

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/messages", messageRouter);

let retries = 0;
function startApp() {
  connectDB()
    .then(() => {
      console.log(DB_MESSAGES.CONNECTED);
      server.listen(SERVER.PORT, () => {
        console.log(SERVER.START_MESSAGE(SERVER.MODE, SERVER.PORT));
      });
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
