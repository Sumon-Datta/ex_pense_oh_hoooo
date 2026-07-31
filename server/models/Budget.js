import mongoose from "mongoose";

const budgetCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    categories: {
      type: [budgetCategorySchema],
      default: [
        { name: "House Rent", amount: 0 },
        { name: "Bike", amount: 0 },
        { name: "Bazar", amount: 0 },
        { name: "Groceries", amount: 0 },
        { name: "Shopping", amount: 0 },
        { name: "Basay Pathano", amount: 0 },
        { name: "DPS", amount: 0 },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", budgetSchema);