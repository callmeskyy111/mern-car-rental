import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addCar, changeRoleToOwner } from "../controllers/Owner.controller.js";
import upload from "../middlewares/multer.middleware.js";

const ownerRouter = Router();

// owner-routes/api-endpoints
ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", upload.single("image"), protect, addCar);


export default ownerRouter;
