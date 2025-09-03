import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// JWT generation f(x)
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "Please fill all fields properly (password ≥ 8 chars)! 🔴",
      });
    }

    // Check for existing user
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists! 🔴",
      });
    }

    // Hash password - Added security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id.toString());

    // Response
    res.json({
      success: true,
      token,
      message: "User registered successfully ✅",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
