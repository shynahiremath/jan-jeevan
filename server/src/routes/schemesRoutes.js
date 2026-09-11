import express from "express";
import { getAllSchemes } from "../controllers/schemesController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, getAllSchemes);

export default router;