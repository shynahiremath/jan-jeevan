import express from "express";
import { postYieldPrediction } from "../controllers/yieldController.js";

const router = express.Router();
router.post("/predict", postYieldPrediction);
export default router;
