const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWTSecretKey } = require("../utils/constants");
const { Invalid_Cred } = require("../utils/customMessages");

const userAuth1 = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ data: "Token is Invalid", message: "Please Login!" });
    }

    const decodedMessage = await jwt.verify(token, JWTSecretKey);
    const { _id } = decodedMessage;
    const userData = await User.findById(_id);

    if (!userData) {
      throw new Error(Invalid_Cred);
    }

    req.user = userData;

    next();
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ data: "Token is Invalid", message: "Please Login!" });
    }

    const decodedMessage = await jwt.verify(token, JWTSecretKey);
    const { _id } = decodedMessage;
    const userData = await User.findById(_id);

    if (!userData) {
      return res.status(401).json({
        data: Invalid_Cred,
        message: Invalid_Cred,
      });
    }

    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Error: " + err.message });
  }
};

module.exports = { userAuth };
