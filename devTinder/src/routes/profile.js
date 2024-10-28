const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const { sendOtpEmail } = require("../utils/emailHandler");

const { OTP_CONFIG } = require("../utils/defaults");
const { PROFILE_MESSAGES, OTP_MESSAGES } = require("../utils/messages");

// Get profile data
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.json({ data: req.user, message: PROFILE_MESSAGES.PROFILE_DATA });
  } catch (err) {
    res.status(500).json({ message: PROFILE_MESSAGES.EROR_FETCHING_PROFILE });
  }
});

// EDIT profile data
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res
        .status(400)
        .json({ message: PROFILE_MESSAGES.INVALID_EDIT_REQUEST });
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

    res.json({
      message: `${req.user.fName} ${PROFILE_MESSAGES.UPDATE_SUCCESS}`,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: PROFILE_MESSAGES.EROR_UPADATING_PROFILE });
  }
});

// Send OTP for password reset
profileRouter.patch("/profile/resetPassword", async (req, res) => {
  try {
    const { emailId } = req.body;
    const user = await User.findOne({ emailId });

    if (!user)
      return res.status(404).json({ message: PROFILE_MESSAGES.USER_NOT_FOUND });

    const otp = crypto.randomInt(100000, 999999).toString();
    user.resetPasswordOtp = otp;
    user.otpExpires = Date.now() + OTP_CONFIG.EXPIRY_DURATION;
    await user.save();

    const emailResponse = await sendOtpEmail(user.emailId, otp);
    if (!emailResponse.success) {
      return res.status(500).json({ message: emailResponse.message });
    }
    res.json({ message: OTP_MESSAGES.SENT });
  } catch (error) {
    res.status(500).json({ message: OTP_MESSAGES.ERROR_SENDING });
  }
});

// Confirm OTP and reset password
profileRouter.patch("/profile/confirmResetPassword", async (req, res) => {
  try {
    const { emailId, otp, newPassword } = req.body;
    const user = await User.findOne({ emailId });

    if (!user)
      return res.status(404).json({ message: PROFILE_MESSAGES.USER_NOT_FOUND });
    if (user.resetPasswordOtp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: OTP_MESSAGES.INVALID_OR_EXPIRED });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({ message: OTP_MESSAGES.RESET_SUCCESS });
  } catch (error) {
    res.status(500).json({ message: OTP_MESSAGES.ERROR_RESETTING });
  }
});

module.exports = profileRouter;
