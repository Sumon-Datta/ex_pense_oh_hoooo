function IncomeCard({
  income,
  editIncome,
  deleteIncome,
}) {
  return (
    <div className="border rounded-xl p-4 mb-4 hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-lg font-bold">
            {income.category}
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            {income.note || "No Note"}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            {new Date(income.date).toLocaleDateString()}
          </p>
        </div>

        <div className="text-right">

          <p className="text-2xl font-bold text-green-600">
            ৳{income.amount}
          </p>

          <div className="flex gap-2 mt-3 justify-end">

            <button
              onClick={() => editIncome(income)}
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={() => deleteIncome(income._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default IncomeCard;