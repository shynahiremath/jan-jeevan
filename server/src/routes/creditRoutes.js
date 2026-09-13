import express from "express";
import { postCreditScore } from "../controllers/creditController.js";

const router = express.Router();
router.post("/score", postCreditScore);
export default router;
