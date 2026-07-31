function RecentIncome({ incomes = [] }) {
  const recent = [...incomes]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Recent Income
        </h2>

      </div>

      {recent.length === 0 ? (
        <p className="text-gray-500">
          No income found.
        </p>
      ) : (
        recent.map((income) => (
          <div
            key={income._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">
                {income.category}
              </h3>

              <p className="text-sm text-gray-500">
                {income.note || "No Note"}
              </p>
            </div>

            <div className="text-right">

              <p className="font-bold text-green-600">
                ৳ {Number(income.amount).toLocaleString()}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(
                  income.date
                ).toLocaleDateString()}
              </p>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentIncome;