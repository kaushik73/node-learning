const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const {
  ALLOWED_CORS_METHODS,
  ALLOWED_FRONTEND_URI,
} = require("../utils/constants/config");

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: ALLOWED_FRONTEND_URI,
    credentials: true,
    methods: ALLOWED_CORS_METHODS,
  },
});

// Track users online with userId and socketId
let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  const userId = socket.handshake.query.userId;
  // Handle user joining
  socket.on("join", ({ userId }) => {
    onlineUsers.set(userId, socket.id);
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys())); // Emit list of online users to all connected clients
    console.log(`User ${userId} connected with socket ${socket.id}`);
  });

  // Handle user message
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      // Send message directly to the receiver if they are online
      io.to(receiverSocketId).emit("receiveMessage", {
        senderId,
        message,
        createdAt: new Date().toISOString(),
      });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    // Remove the user from the online users map
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys())); // Update online users list for all clients
    console.log("Client disconnected", socket.id);
  });
});

module.exports = { app, server };
