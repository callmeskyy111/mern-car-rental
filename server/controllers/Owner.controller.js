import imagekit from "../configs/imageKit.js";
import CarModel from "../models/Car.models.js";
import UserModel from "../models/User.model.js";
import fs from "fs";

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

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const resp = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    // Gnerate URL after optimization
    // For URL Generation, works for both images and videos
    const optimizedImageURL = imagekit.url({
      path: resp.filePath,
      transformation: [
        {
          width: "1280", // Width resizing
        },
        {
          quality: "auto", // Auto Compression
        },
        {
          format: "webp", // Convert to modern-format
        },
      ],
    });

    const image = optimizedImageURL;

    // Finally, store the image in MongoDB
    await CarModel.create({ ...car, owner: _id, image });

    res.json({ success: true, message: "Car added ✅" });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
