const { OTP_MESSAGES } = require("./messages");
const { EMAIL } = require("./config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: EMAIL.SERVICE_TYPE,
  auth: EMAIL.CREDENTIALS,
});
async function sendOtpEmail(to, otp) {
  try {
    await transporter.sendMail({
      from: EMAIL.FROM_ADDRESS,
      to,
      subject: EMAIL.SUBJECT_RESET_OTP,
      text: EMAIL.TEXT_MESSAGE(otp),
    });
    return { success: true, message: OTP_MESSAGES.SENT };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: MESSAGES.ERROR_SENDING_OTP };
  }
}

module.exports = { sendOtpEmail };
