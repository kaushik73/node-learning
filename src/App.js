const dotenv = require("dotenv");
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: envFile });

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http"); // Import HTTP to create a server
const socketIo = require("socket.io"); // Import Socket.IO

const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/requests");
const userRouter = require("../src/routes/user");
const messageRouter = require("../src/routes/message"); // Add message routes
const connectDB = require("./config/database");

const { DB_MESSAGES } = require("./utils/constants/messages");
const {
  ALLOWED_CORS_METHODS,
  RETRY,
  ALLOWED_FRONTEND_URI,
  SERVER,
} = require("./utils/constants/config");

const app = express();
const server = http.createServer(app); // Create HTTP server instance
const io = socketIo(server, {
  cors: {
    origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ALLOWED_CORS_METHODS,
  },
}); // Initialize Socket.IO with CORS settings

app.use(
  cors({
    origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ALLOWED_CORS_METHODS,
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

// Socket.IO events
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Join a room based on conversation ID
//   socket.on("joinRoom", (conversationId) => {
//     socket.join(conversationId);
//     console.log(`User joined room: ${conversationId}`);
//   });

//   // Send a message to a specific room
//   socket.on("sendMessage", async (data) => {
//     const { conversationId, senderId, receiverId, content } = data;
//     try {
//       const message = await Message.create({
//         conversationId,
//         senderId,
//         receiverId,
//         content,
//       });
//       io.to(conversationId).emit("receiveMessage", message); // Emit message to room
//     } catch (err) {
//       console.error("Error saving message:", err);
//     }
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

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
