import express from "express";
import { assessDamage } from "../controllers/damageAssessment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("DRIVER"),
  assessDamage
);

export default router;
