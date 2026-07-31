import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// User Routes
app.use("/api/users", userRoutes);

// Expense Routes
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);