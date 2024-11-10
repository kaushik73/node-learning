const DB_MESSAGES = {
  CONNECTED: "DB Connected",
  ERROR: "Error connecting to DB",
  RETRY: (retries) => `Retrying to connect to DB... Attempt ${retries}`,
  MAX_RETRIES_REACHED: "Max retries reached. Shutting down.",
};

const PROFILE_MESSAGES = {
  PROFILE_DATA: "Profile data",
  INVALID_EDIT_REQUEST: "Invalid Profile Edit Request",
  UPDATE_SUCCESS: "Profile is updated successfully",
  USER_NOT_FOUND: "User not found",
  EROR_FETCHING_PROFILE: "Error Fetching Profile",
  EROR_UPADATING_PROFILE: "Error Updating Profile",
  NO_ACTIVE_CONNECTIONS: "No active connection request found",
  CONNECTIONS_FETCH_SUCCESS: "Connections fetched successfully",
};

const OTP_MESSAGES = {
  SENT: "OTP sent to your email",
  INVALID_OR_EXPIRED: "Invalid or expired OTP",
  RESET_SUCCESS: "Password has been reset successfully",
  ERROR_SENDING: "Error sending OTP",
  ERROR_RESETTING: "Error resetting password",
};

const REQUEST_MESSAGES = {
  INVALID_STATUS: "Invalid status type",
  USER_NOT_EXIST: "User does not exist",
  REQUEST_SELF: "You cannot send a request to yourself",
  REQUEST_ALREADY_EXISTS: "Request already exists, in review state",
  REQUEST_NOT_FOUND: "Connection request not found",
  CONNECTION_REQUEST_UPDATED: "Connection request updated successfully",
};

const AUTH_MSG = {
  TOKEN_INVALID: "Token is Invalid. Please log in.",
  INVALID_CREDENTIALS: "Invalid credentials, please try again.",
  UNAUTHORIZED_ACCESS: "Unauthorized access",
};

const FEED_MESSAGES = {
  FETCH_SUCCESS: "Feed data retrieved successfully",
  ERROR_FETCHING_DATA: "Error fetching data",
};

const ERROR = {
  CONNECTION: {
    INVALID_STATUS: "{VALUE} is an invalid status type",
    SELF_CONNECTION: "Cannot send connection request to yourself",
  },
  AGE: {
    MIN: "Age below 18 is not valid",
    MAX: "Age above 100 is not valid",
  },
  EMAIL: {
    REQUIRED: "Email ID is required",
    INVALID: "Invalid Email ID",
  },
  PASSWORD: {
    REQUIRED: "Password is required",
  },
  GENDER: "Invalid gender",
};

const CUSTOM_MESSAGES = {
  INTERESTED_MESSAGE: (fromUser, toUser) =>
    `${fromUser} is interested in ${toUser}`,
  IGNORED_MESSAGE: (fromUser, toUser) => `${fromUser} has ignored ${toUser}`,
  ERROR: (error) => `Error: ${error.message || error}`,
};

const GENERAL_MESSAGES = {
  INVALID_CRED: "Invalid Credentials",
  LOGOUT_SUCCESS: "Logout success",
  LOGIN_SUCCESS: "Login success",
  USER_SIGNUP_SUCCESS: "User signup success",
  ERROR_SENDING_OTP: "Error sending OTP",
  MIN_AGE_MESSAGE: "Age below 18 is not valid",
  MAX_AGE_MESSAGE: "Age above 100 is not valid",
  EMAIL_REQUIRED: "Email ID is required",
  PASSWORD_REQUIRED: "Password is required",
  USER_ALREADY_EXIST: "User already exist",
};

module.exports = {
  DB_MESSAGES,
  PROFILE_MESSAGES,
  OTP_MESSAGES,
  REQUEST_MESSAGES,
  AUTH_MSG,
  FEED_MESSAGES,
  ERROR,
  CUSTOM_MESSAGES,
  GENERAL_MESSAGES,
};
