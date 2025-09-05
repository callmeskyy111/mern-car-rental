import BookingModel from "../models/Booking.model.js";
import CarModel from "../models/Car.model.js";

export async function checkAvailability(car, pickupDate, returnDate) {
  const bookings = await BookingModel.find({
    car,
    pickupDate: { $le: returnDate },
    returnDate: { $gte: pickupDate },
  });
  return bookings.length === 0;
}

// Find avilabilty of car for the given date and location
export async function checkAvailabilityOfCar(req, res) {
  try {
    const { location, pickupDate, returnDate } = req.body;

    // fetch all available cars for the given location
    const cars = await CarModel.find({ location, isAvailable: true });

    // check car availability for the given date-range using PROMISE
    const availableCarsPromise = cars.map(async (car) => {
      const available = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );
      return { ...car._doc, isAvailable: available };
    });
    let availableCars = await Promise.all(availableCarsPromise);
    availableCars.filter((car) => car.isAvailable === true);
    res.json({
      success: true,
      message: "Fetched list of available cars ✅",
      availableCars,
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to create booking
export async function createBooking(req, res) {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Car is UNAVAILABLE 🔴",
      });
    }

    // If available, add car-data
    const carData = CarModel.findById(car);

    // Calculate price based on pickup and return dates
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    // store the data in DB
    await BookingModel.create({
      car,
      owner: carData.owner,
      user: _id,
      pickupDate,
      returnDate,
      price,
    });

    res.json({ success: true, message: "Booking created ✅" });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to list user-bookings
export async function getUserBookings(req, res) {
  try {
    const { _id } = req.user;
    const bookings = await BookingModel.find({ user: _id })
      .populate("car")
      .sort({ createdAt: -1 });
    res.json({ success: true, message: "User Bookings fetched ✅", bookings });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to list owner-bookings
export async function getOwnerBookings(req, res) {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "UNAUTHORIZED! 🔴" });
    }
    const bookings = await BookingModel.find({ owner: req.user._id })
      .populate("car user")
      .select("-user.password")
      .sort({ createdAt: -1 });
    res.json({ success: true, message: "Owner Bookings fetched ✅", bookings });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}

// API to let owner UPDATE booking-status
export async function updateBookingStatus(req, res) {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;
    const booking = await BookingModel.findById(bookingId);

    if (booking.owner.toString() !== _id.toString()) {
      // if owner isn't same
      return res.json({ success: false, message: "UNAUTHORIZED! 🔴" });
    }

    booking.status = status;
    await booking.save();
    res.json({ success: true, message: "Booking-Status updated ✅" });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: `🔴 ERROR: ${err.message}` });
  }
}
