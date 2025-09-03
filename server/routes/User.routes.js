import { Router } from "express";
import { loginUser, registerUser } from "../controllers/User.controller.js";

const userRouter = Router();

// user-routes/api-endpoints

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
