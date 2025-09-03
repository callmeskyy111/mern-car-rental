import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//jwt generation f(x) for registerUser
function generateToken(userId) {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
}

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    //check for input
    if (!name || !email || !password || !password.length < 8) {
      return res.json({
        success: false,
        message: "Please fill all the fields properly! 🔴",
      });
    }
    //check whether user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists! 🔴",
      });
    }
    //hash password - bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // password and salt

    //finally, create the user
    const user = await UserModel.create({ name, email, hashedPassword });

    //generate token - jwt
    const token = generateToken(user._id.toString());

    //gnerate a response upon successful registration
    res.json({
      success: true,
      token,
      message: "User registered successfully ✅",
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: `🔴ERROR: ${err.message}` });
  }
}
