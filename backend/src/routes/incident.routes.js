import express from "express";
import { createIncident } from "../controllers/incident.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  allowRoles("DRIVER"),
  createIncident
);

export default router;
