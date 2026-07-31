import express from "express";
import {
  addIncome,
  getIncome,
} from "../controllers/incomeController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/", protect, getIncome);

export default router;