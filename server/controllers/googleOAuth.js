import userModel from "../models/userModel.js"; // Add .js extension
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const googleOAuth = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    // Check if user exists
    let user = await userModel.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = new userModel({
        name,
        email,
        googleId,
        password: crypto.randomBytes(16).toString("hex"),
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      message: "Successfully authenticated with Google",
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};
