import express from "express";
import { assessDamage } from "../controllers/damageAssessment.controller.js";

const router = express.Router();

router.post("/", assessDamage);

export default router;
