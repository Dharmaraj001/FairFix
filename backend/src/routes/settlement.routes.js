import express from "express";
import { createSettlement } from "../controllers/settlement.controller.js";

const router = express.Router();

router.post("/", createSettlement);

export default router;
