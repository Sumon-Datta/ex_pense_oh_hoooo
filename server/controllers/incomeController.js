import Income from "../models/Income.js";

// =======================
// Add Income
// =======================
export const addIncome = async (req, res) => {
  try {
    const { category, amount, note, date } = req.body;

    const income = await Income.create({
      user: req.user.id,
      category,
      amount,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Income added successfully.",
      income,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Get All Income
// =======================
export const getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      incomes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Update Income
// =======================
export const updateIncome = async (req, res) => {
  try {
    const { category, amount, note, date } = req.body;

    const income = await Income.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        category,
        amount,
        note,
        date,
      },
      {
        new: true,
      }
    );

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income updated successfully.",
      income,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =======================
// Delete Income
// =======================
export const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};