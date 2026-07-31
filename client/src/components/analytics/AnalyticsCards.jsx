function AnalyticsCards({ expenses }) {
  const highestExpense =
    expenses.length > 0
      ? expenses.reduce((max, expense) =>
          Number(expense.amount) > Number(max.amount)
            ? expense
            : max
        )
      : null;

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += Number(expense.amount);
  });

  let topCategory = "";
  let topCategoryAmount = 0;

  Object.keys(categoryTotals).forEach((category) => {
    if (categoryTotals[category] > topCategoryAmount) {
      topCategory = category;
      topCategoryAmount = categoryTotals[category];
    }
  });

  const averageExpense =
    expenses.length > 0
      ? (
          expenses.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          ) / expenses.length
        ).toFixed(2)
      : 0;

  const today = new Date().toISOString().split("T")[0];

  const todayExpense = expenses
    .filter(
      (expense) =>
        expense.date.split("T")[0] === today
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-gray-500">💰 Highest Expense</p>

        <h2 className="text-3xl font-bold mt-3">
          ৳
          {highestExpense
            ? highestExpense.amount
            : 0}
        </h2>

        <p className="text-gray-600 mt-2">
          {highestExpense
            ? highestExpense.category
            : "-"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
          🏆 Top Category
        </p>

        <h2 className="text-3xl font-bold mt-3">
          {topCategory || "-"}
        </h2>

        <p className="text-gray-600 mt-2">
          ৳{topCategoryAmount}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
          📈 Average Expense
        </p>

        <h2 className="text-3xl font-bold mt-3">
          ৳{averageExpense}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-gray-500">
          📅 Today's Expense
        </p>

        <h2 className="text-3xl font-bold mt-3">
          ৳{todayExpense}
        </h2>
      </div>

    </div>
  );
}

export default AnalyticsCards;