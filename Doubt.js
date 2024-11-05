const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Please Login! Token is missing");
    }
    const userData = await User.findById(_id);

    if (!userData) {
      throw new Error("Invalid credentials, please try again!");
    }
  } catch (err) {
    next(err);
  }
};

const userAuth1 = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is missing, please log in" });
    }
    const userData = await User.findById(_id);

    if (!userData) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// // ------------------------------------
// File = message.js line=85 -> what to export = name, name_msg , name_message

// // ------------------------------------
// config.js -> how to write in better way :
// user: process.env.GMAIL_USER || "kaushikjain67890@gmail.com",
