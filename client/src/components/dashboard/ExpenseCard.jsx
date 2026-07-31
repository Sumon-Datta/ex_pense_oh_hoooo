import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

function ExpenseCard({
  expense,
  editExpense,
  deleteExpense,
}) {
  return (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 mb-4">

    <div className="flex justify-between items-start gap-4">

      <div className="flex-1">

        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {expense.category}
        </span>

        <h3 className="text-2xl font-bold text-green-600 mt-3">
          ৳ {expense.amount}
        </h3>

        {expense.note && (
          <p className="text-gray-600 mt-2">
            {expense.note}
          </p>
        )}

        <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
          <FaCalendarAlt />
          <span>
            {new Date(expense.date).toLocaleDateString()}
          </span>
        </div>

      </div>

      <div className="flex flex-col gap-2">

        <button
          onClick={() => editExpense(expense)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl transition"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => deleteExpense(expense._id)}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
        >
          <FaTrash />
        </button>

      </div>

    </div>

  </div>
);
}

export default ExpenseCard;