import Income from "../models/Income.js";

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