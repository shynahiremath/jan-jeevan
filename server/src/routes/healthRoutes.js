import express from "express";
import { postSymptomScreen, getHealthWatch } from "../controllers/healthController.js";

const router = express.Router();
router.post("/screen", postSymptomScreen);
router.get("/watch", getHealthWatch);
export default router;
