const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT } = require("../utils/config");
const { MESSAGES } = require("../utils/messages");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: MESSAGES.AUTH.TOKEN_INVALID,
        data: null,
      });
    }

    // Verify and decode token
    const decodedMessage = jwt.verify(token, JWT.SECRET_KEY);
    const userData = await User.findById(decodedMessage._id);

    // Check if user exists in database
    if (!userData) {
      return res.status(401).json({
        message: MESSAGES.AUTH.INVALID_CREDENTIALS,
        data: null,
      });
    }

    // Attach user data to request object
    req.user = userData;
    next();
  } catch (err) {
    // Handle JWT verification errors and send unauthorized response
    res.status(401).json({
      message: `${MESSAGES.AUTH.UNAUTHORIZED_ACCESS}: ${err.message}`,
      data: null,
    });
  }
};

module.exports = { userAuth };
