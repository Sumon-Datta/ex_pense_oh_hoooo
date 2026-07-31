import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { category, amount, note, date } = req.body;

    // Login করা User-এর ID
    const user = req.user.id;

    const expense = await Expense.create({
      user,
      category,
      amount,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const user = req.user.id;

    const expenses = await Expense.find({ user }).sort({
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      expenses,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { category, amount, note, date } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    expense.category = category;
    expense.amount = amount;
    expense.note = note;
    expense.date = date;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 