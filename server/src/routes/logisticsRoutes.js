import express from "express";
import { postCompareMarkets } from "../controllers/logisticsController.js";

const router = express.Router();
router.post("/compare", postCompareMarkets);
export default router;
