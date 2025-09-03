import UserModel from "../models/User.model.js";

// change-role
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

// API to list/add car
export async function addCar(req, res) {
  try {
    const { _id } = req.user;
    let car = JSON.parse(req.body.carData);
    const imageFile = req.file;
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
