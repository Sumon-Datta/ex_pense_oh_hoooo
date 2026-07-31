import ExpenseCard from "./ExpenseCard";

function ExpenseList({
  expenses,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  editExpense,
  deleteExpense,
  sortBy,
  setSortBy,
}) {
  const filteredExpenses = expenses.filter((expense) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      expense.category.toLowerCase().includes(keyword) ||
      (expense.note || "").toLowerCase().includes(keyword);

    const matchesCategory =
      categoryFilter === "All" || expense.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  console.log("Sort By:", sortBy);
console.log(
  "Amounts:",
  filteredExpenses.map((e) => e.amount)
);

console.log("sortBy =", sortBy);
console.log("setSortBy =", setSortBy);

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.date) - new Date(b.date);

      case "highest":
        return Number(b.amount) - Number(a.amount);

      case "lowest":
        return Number(a.amount) - Number(b.amount);

      default: // newest
        return new Date(b.date) - new Date(a.date);
    }
  });
  console.log(
  "Sorted:",
  sortedExpenses.map((e) => ({
    amount: e.amount,
    date: e.date,
  }))
);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4">My Expenses</h2>

      <div className="my-5">
        <input
          type="text"
          placeholder="🔍 Search by category or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Medical">Medical</option>
            <option value="Bills">Bills</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mt-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
      
      sortedExpenses.map((expense) => (
          <ExpenseCard
            key={expense._id}
            expense={expense}
            editExpense={editExpense}
            deleteExpense={deleteExpense}
          />
        ))
        
      )}
      
    </div>
  );
}

export default ExpenseList;
