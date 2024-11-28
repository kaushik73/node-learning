const OTP_CONFIG = {
  EXPIRY_DURATION: 5 * 60 * 1000, // 5 minutes
};

const USER_DEFAULTS = {
  IMAGE_URI:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mYGiDHOtUVcSxuzNfeds4xWXNOpQ-lIMPA&s",
  ABOUT: "This is default about",
  SAFE_DATA_FIELDS:
    "fName lName age gender about skills profileURL lastActiveTime",
  ALLOWED_PROFILE_UPDATES: [
    "profileURL",
    "about",
    "gender",
    "age",
    "fName",
    "lName",
  ],
  MIN_AGE: 18,
  MAX_AGE: 100,
  ALLOWED_GENDERS: ["male", "female", "other"],
};

const CONNECTION_STATUSES = {
  REVIEW: ["accepted", "rejected"],
  SENT: ["interested", "ignored"],
  ALL_STATUS: ["ignored", "interested", "accepted", "rejected"],
};

const FEED_CONFIG = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};

module.exports = {
  OTP_CONFIG,
  USER_DEFAULTS,
  CONNECTION_STATUSES,
  FEED_CONFIG,
};
