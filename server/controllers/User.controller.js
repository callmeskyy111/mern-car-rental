import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// JWT generation f(x)
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// 1️⃣ register-user

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

// 2️⃣ login-user

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    // if user is not found..
    if (!user) {
      return res.json({
        success: false,
        message: "Could not find the user! 🔴",
      });
    }

    // validate the password
    const isMatch = await bcrypt.compare(password, user.password);

    // if password doesn't match..
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials! 🔴",
      });
    }

    // if all ok, then send token to allow User-LOGIN

    // Generate JWT
    const token = generateToken(user._id.toString());

    // Response
    res.json({
      success: true,
      token,
      message: "User Logged-In successfully ✅",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// 3️⃣ GET user-data using JWT

export async function getUserData(req, res) {
  try {
    const { user } = req;
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
