const { AllowedProfileUpdates } = require("./constants");

const validateEditProfileData = (req) => {
  try {
    const modifiedData = req.body;

    const ALLOWED_UPDATES = AllowedProfileUpdates;
    const isEditAllowed = Object.keys(modifiedData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    return isEditAllowed;
  } catch (err) {
    res.status(400).send(JSON.stringify(err.message));
  }
};

module.exports = { validateEditProfileData };
