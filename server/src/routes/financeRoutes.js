import express from "express";
import { saveFinanceRecord, getFinanceDashboard } from "../controllers/financeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/records", protect, saveFinanceRecord);
router.get("/dashboard", protect, getFinanceDashboard);

export default router;