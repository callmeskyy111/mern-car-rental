import mongoose from "mongoose";

export default async function connectDB() {
  try {
    mongoose.connection.on("connected", () => console.log("DB connected ✅"));
    await mongoose.connect(`${process.env.MONGODB_URI}/carrental`);
  } catch (error) {
    console.log(error.message);
  }
}
