const ALLOWED_CORS_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
];
const ALLOWED_FRONTEND_URI = process.env.ALLOWED_FRONTEND_URI;

const DATABASE = {
  URI:
    process.env.MONGO_DB_URI ||
    "mongodb+srv://NamasteNode:HcM1uzZSFggAQMtY@namastenode.l8mtm.mongodb.net/devTinder",
};

const JWT = {
  SECRET_KEY: process.env.JWT_SECRET_KEY || "DEV@Tinder$790",
  EXPIRES_IN: "7d",
};

const EMAIL = {
  SERVICE_TYPE: "gmail",
  CREDENTIALS: {
    user: process.env.GMAIL_USER || "kaushikjain67890@gmail.com",
    pass: process.env.GMAIL_PASS || "vkfx pibl pjey upoa",
  },
  FROM_ADDRESS: "kaushikjain67890@gmail.com",
  SUBJECT_RESET_OTP: "Password Reset OTP",
  TEXT_MESSAGE: (otp) =>
    `Your OTP for resetting the password is: ${otp}. It will expire in 5 minutes.`,
};

const RETRY = {
  DELAY_MS: 3000,
  MAX_ATTEMPTS: 5,
};

const SERVER = {
  MODE: process.env.MODE || "default",
  PORT: process.env.PORT || 3000, // Default to 3000(local) if PORT isn't set
  START_MESSAGE: (mode, port) => `Server in ${mode} mode, running on - ${port}`,
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
