import express from "express";
import { findNearbyMechanics } from "../controllers/mechanic.controller.js";

const router = express.Router();

router.get("/nearby", findNearbyMechanics);

export default router;
