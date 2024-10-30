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
const connectDB = require("./config/database");
const User = require("./models/user");

const { DB_MESSAGES } = require("./utils/constants/messages");
const {
  ALLOWED_CORS_METHODS,
  RETRY,
  ALLOWED_FRONTEND_URI,
  SERVER,
} = require("./utils/constants/config");

const app = express();

app.use(
  cors({
    origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ALLOWED_CORS_METHODS,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // specify headers if needed
  })
);
app.options("*", cors()); // Enable preflight across-the-board

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
