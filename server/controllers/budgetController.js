import Budget from "../models/Budget.js";

export const getBudget = async (req, res) => {
  try {
    const { month } = req.params;

    let budget = await Budget.findOne({
      user: req.user.id,
      month,
    });

    if (!budget) {
      budget = await Budget.create({
        user: req.user.id,
        month,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const saveBudget = async (req, res) => {
  try {
    
    const { month, categories } = req.body;
    console.log(req.body);

    let budget = await Budget.findOne({
      user: req.user.id,
      month,
    });

    if (!budget) {
      budget = await Budget.create({
        user: req.user.id,
        month,
        categories,
      });
    } else {
      budget.categories = categories;
      await budget.save();
    }

    res.status(200).json({
      message: "Budget saved successfully",
      budget,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};