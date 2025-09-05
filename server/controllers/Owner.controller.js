import imagekit from "../configs/imageKit.js";
import BookingModel from "../models/Booking.model.js";
import CarModel from "../models/Car.model.js";
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

// API to list owner cars
export async function getOwnerCars(req, res) {
  try {
    const { _id } = req.user;
    const cars = await CarModel.find({ owner: _id });
    res.json({
      success: true,
      message: "Fetched list of cars by owner ✅",
      cars,
    });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to toggle car-availability
export async function toggleAvailability(req, res) {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await CarModel.findById(carId);

    // checking whether car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: `🔴 Unauthorized!` });
    }

    car.isAvailable = !car.isAvailable;
    await car.Save();

    res.json({
      success: true,
      message: "Availability toggled ✅",
    });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to DELETE Car
// remove ownership, as someone booking the car will be able to see it in their booking history
export async function deleteCar(req, res) {
  const { _id } = req.user;
  const { carId } = req.body;
  const car = await CarModel.findById(carId);

  // checking whether car belongs to the user
  if (car.owner.toString() !== _id.toString()) {
    return res.json({ success: false, message: `🔴 Unauthorized!` });
  }

  car.owner = null;
  await car.Save();

  res.json({
    success: true,
    message: "Car removed ✅",
  });

  try {
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to GET dashboard data
export async function getDashboardData(req, res) {
  try {
    const { _id, role } = req.user;

    // check role
    if (role !== "owner") {
      return res.json({
        success: false,
        message: `🔴 Unauthorized!`,
      });
    }

    const cars = CarModel.find({ owner: _id });

    const bookings = await BookingModel.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingBookings = await BookingModel.find({
      owner: _id,
      status: "pending",
    });

    const completedBookings = await BookingModel.find({
      owner: _id,
      status: "confirmed",
    });

    // calculate monthly revenue from bookings where status === "confirmed"
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => acc + booking.price, 0);

    // finally, create dashboard-data obj{}
    const dashboardData = {
      totalcars: (await cars).length,
      totalBookings: bookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: completedBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.json({
      success: true,
      message: "Fetched Dashboard Data ✅",
      dashboardData,
    });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to update user-image
export async function updateUserImage(req, res) {
  try {
    const { _id } = req.user;

    const imageFile = req.file;

    // Upload image to ImageKit
    const fileBuffer = fs.readFileSync(imageFile.path);
    const resp = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/users",
    });

    // optimization
    // For URL Generation, works for both images and videos
    const optimizedImageURL = imagekit.url({
      path: resp.filePath,
      transformation: [
        {
          width: "400", // Width resizing
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

    await UserModel.findByIdAndUpdate(_id, { image });
    res.json({ success: true, message: "Image updated ✅" });
  } catch (err) {
    console.log(`🔴 ERROR: ${err.message}`);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
