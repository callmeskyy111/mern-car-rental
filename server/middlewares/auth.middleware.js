import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

export async function protect(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);
    if (!userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }
    req.user = await UserModel.findById(userId).select("-password");
    next();
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    return res.json({ success: false, message: "Not Authorized" });
  }
}
