const user = require("../models/User");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const PasswordResetLinktamplet = require("../mail/tamplets/PasswordResetLink")

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const USER = await user.findOne({ email: email });

    if (!USER) {
      return res.status(401).json({
        success: false,
        message: "user not registered",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updateDetails = await user.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailsender(
      email,
      "password Reset Link",
      PasswordResetLinktamplet(url),
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending the email",
      error:e.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (!password || !confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "please fill all the fields,",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "password and confirm password should be same",
      });
    }
    const USER = await user.findOne({ token: token });

    if (!USER) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    if (USER.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedDetails = await user.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password Updated SuccessFully",
      password: password,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting the password",
    });
  }
};
