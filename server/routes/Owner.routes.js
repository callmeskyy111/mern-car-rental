import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { changeRoleToOwner } from "../controllers/Owner.controller.js";

const ownerRouter = Router();

// owner-routes/api-endpoints
ownerRouter.post("/change-role", protect, changeRoleToOwner);

export default ownerRouter;
