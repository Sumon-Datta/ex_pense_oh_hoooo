import express from "express";
import {
  getBudget,
  saveBudget,
} from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get budget by month
router.get("/:month", authMiddleware, getBudget);

// Save / Update budget
router.post("/", authMiddleware, saveBudget);

export default router;