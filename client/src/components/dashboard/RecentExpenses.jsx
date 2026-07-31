function RecentExpenses({ expenses = [] }) {
  const recent = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Recent Expenses
        </h2>

      </div>

      {recent.length === 0 ? (
        <p className="text-gray-500">
          No Expenses found.
        </p>
      ) : (
        recent.map((expense) => (
          <div
            key={expense._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">
                {expense.category}
              </h3>

              <p className="text-sm text-gray-500">
                {expense.note || "No Note"}
              </p>
            </div>

            <div className="text-right">

              <p className="font-bold text-red-600">
                ৳ {Number(expense.amount).toLocaleString()}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(expense.date).toLocaleDateString()}
              </p>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentExpenses;