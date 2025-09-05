import { Router } from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/User.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// user-routes/api-endpoints

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserData);
userRouter.get("/cars", getCars);

export default userRouter;
