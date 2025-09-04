import { Router } from "express";
import {
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
  updateBookingStatus,
} from "../controllers/Booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const bookingRouter = Router();

// booking-routes/api-endpoints
bookingRouter.post("/check-availability", checkAvailabilityOfCar);
bookingRouter.post("/create-booking", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.post("/update-status", protect, updateBookingStatus);

export default bookingRouter;
