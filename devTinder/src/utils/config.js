// Allowed CORS Methods and URIs
const ALLOWED_CORS_METHODS = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"];
const ALLOWED_FRONTEND_URI = "http://localhost:5173";

// Database Configuration
const DATABASE = {
  URI:
    process.env.MONGO_DB_URI ||
    "mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/devTinder",
};

// JWT Configuration
const JWT = {
  SECRET_KEY: process.env.JWT_SECRET_KEY || "DEV@Tinder$790",
  EXPIRES_IN: "7d",
};

// Email Configuration
const EMAIL = {
  SERVICE_TYPE: "gmail",
  CREDENTIALS: {
    user: process.env.GMAIL_USER || "kaushikjain67890@gmail.com",
    pass: process.env.GMAIL_PASS || "vkfx pibl pjey upoa", // Replace with env variables in production
  },
  FROM_ADDRESS: "kaushikjain67890@gmail.com",
  SUBJECT_RESET_OTP: "Password Reset OTP",
  TEXT_MESSAGE: (otp) =>
    `Your OTP for resetting the password is: ${otp}. It will expire in 5 minutes.`,
};

// Server Retry Logic
const RETRY = {
  DELAY_MS: 3000,
  MAX_ATTEMPTS: 5,
};

// Server Settings
const SERVER = {
  PORT: 7777,
  START_MESSAGE: (mode, port) => `Server in ${mode}, running on - ${port}`,
};

module.exports = {
  ALLOWED_CORS_METHODS,
  ALLOWED_FRONTEND_URI,
  DATABASE,
  JWT,
  EMAIL,
  RETRY,
  SERVER,
};
