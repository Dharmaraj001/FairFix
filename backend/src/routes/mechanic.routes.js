import express from "express";
import { findNearbyMechanics } from "../controllers/mechanic.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/nearby",
  protect,
  allowRoles("DRIVER"),
  findNearbyMechanics
);

export default router;
