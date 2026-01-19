import express from "express";
import { createSettlement } from "../controllers/settlement.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("DRIVER"),
  createSettlement
);

export default router;
