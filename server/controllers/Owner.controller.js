import UserModel from "../models/User.model.js";

export async function changeRoleToOwner(req, res) {
  try {
    const { _id } = req.user;
    await UserModel.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars ✅" });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
