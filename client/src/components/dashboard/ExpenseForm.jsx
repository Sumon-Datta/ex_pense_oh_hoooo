import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaMoneyBillWave,
  FaTags,
  FaStickyNote,
  FaCalendarAlt,
} from "react-icons/fa";

function ExpenseForm({
  expenseData,
  handleChange,
  handleSubmit,
  editingId,
  categories,
}) {

    // const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("token");

    const currentMonth = new Date().toISOString().slice(0, 7);

    const response = await api.get(`/budget/${currentMonth}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCategories(response.data.categories || []);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchCategories();
}, []);


  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">

      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Update Expense" : "Add Expense"}
      </h2>

     <form onSubmit={handleSubmit} className="space-y-5">

  <div>
    <label className="block text-sm font-semibold mb-2">
      Category
    </label>

    <div className="relative">
      <FaTags className="absolute left-4 top-4 text-gray-400" />

     <select
  name="category"
  value={expenseData.category}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
  required
>
  <option value="">Select Category</option>

  {categories.map((category) => (
    <option
      key={category.name}
      value={category.name}
    >
      {category.name}
    </option>
  ))}
</select>
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Amount
    </label>

    <div className="relative">
      <FaMoneyBillWave className="absolute left-4 top-4 text-gray-400" />

      <input
        type="number"
        name="amount"
        value={expenseData.amount}
        onChange={handleChange}
        placeholder="Enter amount"
        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Note
    </label>

    <div className="relative">
      <FaStickyNote className="absolute left-4 top-4 text-gray-400" />

      <input
        type="text"
        name="note"
        value={expenseData.note}
        onChange={handleChange}
        placeholder="Expense note"
        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      Date
    </label>

    <div className="relative">
      <FaCalendarAlt className="absolute left-4 top-4 text-gray-400" />

      <input
        type="date"
        name="date"
        value={expenseData.date}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform duration-300"
  >
    {editingId ? "Update Expense" : "Add Expense"}
  </button>

</form>

    </div>
  );
}

export default ExpenseForm;