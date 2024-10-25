const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");
const { ErrorSendingOTP } = require("../utils/customMessages");
const { GmailSecretCred, emailServiceType } = require("../utils/constants");
const transporter = nodemailer.createTransport({
  service: emailServiceType,
  auth: GmailSecretCred,
});

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.json({ data: req.user, message: "profile data" });
  } catch (err) {
    // token not valid :
    res.status(404).json({ message: "Something Went wrong", data: err });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(203).json({ message: "Invalid Profile Edit Request " });
    }

    const user = req.user;
    const modifiedData = req.body;
    Object.keys(req.body).forEach((key) => (modifiedData[key] = req.body[key]));

    const data = await User.findOneAndUpdate(
      { emailId: user.emailId },
      modifiedData,
      {
        runValidators: true,
        new: true,
      }
    );

    return res.json({
      message: `${req.user.fName} profile is updated successfully`,
      data: data,
    });
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/resetPassword", async (req, res) => {
  const { emailId } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetPasswordOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: "kaushikjain67890@gmail.com",
      to: user.emailId,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting the password is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ message: ErrorSendingOTP, error });
  }
});

profileRouter.patch("/profile/confirmResetPassword", async (req, res) => {
  const { emailId, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetPasswordOtp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOtp = undefined; // Remove OTP
    user.otpExpires = undefined; // Remove expiry time
    await user.save();
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
});

module.exports = profileRouter;
