const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ data: "Token is Invalid", message: "Please Login!" });
    }

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedMessage;
    const userData = await User.findById(_id);

    if (!userData) {
      throw new Error("Invalid Credentails");
    }

    req.user = userData;

    next();
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
};

module.exports = { userAuth };
