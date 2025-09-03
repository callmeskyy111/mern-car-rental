import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema(
  {
    owner: { type: ObjectId, ref: "User" }, // from User model
    brand: { type: String, rquired: true },
    model: { type: String, rquired: true },
    image: { type: String, rquired: true },
    year: { type: Number, rquired: true },
    category: { type: String, rquired: true },
    sitting_capacity: { type: Number, rquired: true },
    fuel_type: { type: String, rquired: true },
    transmission: { type: String, rquired: true },
    pricePerDay: { type: Number, rquired: true },
    description: { type: String, rquired: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CarModel = mongoose.models.Car || mongoose.model("Car", carSchema);

export default CarModel;
