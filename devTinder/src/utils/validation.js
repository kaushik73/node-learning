const { USER_DEFAULTS } = require("./defaults");

const validateEditProfileData = (req) => {
  try {
    const modifiedData = req.body;
    const ALLOWED_UPDATES = USER_DEFAULTS.ALLOWED_PROFILE_UPDATES;

    // Check if all keys in modifiedData are allowed
    const isEditAllowed = Object.keys(modifiedData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    return isEditAllowed;
  } catch (err) {
    console.error("Validation Error:", err.message);
    return false;
  }
};

module.exports = { validateEditProfileData };
