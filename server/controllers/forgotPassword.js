import crypto from "crypto";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email presence
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error("Email configuration is missing");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create Gmail SMTP transporter with detailed logging
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      debug: true, // Enable debugging
      logger: true, // Log to console
    });

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request - ZARAA",
      html: `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>You requested a password reset for your ZARAA account.</p>
      <p>Please click the button below to reset your password:</p>
      <a href="${resetUrl}" 
         style="display: inline-block; padding: 10px 20px; margin: 20px 0; 
                background-color: #000; color: #fff; text-decoration: none; 
                border-radius: 5px;">
        Reset Password
      </a>
      <p>Or copy and paste this link in your browser:</p>
      <p>${resetUrl}</p>
      <p style="color: #666; font-size: 14px;">
        This link will expire in 1 hour. If you didn't request this reset, 
        please ignore this email.
      </p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Password reset link sent to email",
    });
  } catch (error) {
    console.error("Forgot password error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    res.status(500).json({
      success: false,
      message: "Error sending reset email. Please check server logs.",
    });
  }
};
