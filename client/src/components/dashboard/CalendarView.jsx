import { useState } from "react";

function CalendarView({ expenses,
  incomes,
  expenseByDate, }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");

const [showReport, setShowReport] = useState(false);

  const month = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
  };

  const selectedExpenses = selectedDate
    ? expenses.filter(
        (expense) =>
          expense.date.split("T")[0] === selectedDate
      )
    : [];


    const rangeExpenses =
  fromDate && toDate
    ? expenses.filter((expense) => {
        const date = expense.date.split("T")[0];

        return date >= fromDate && date <= toDate;
      })
    : [];


    const rangeIncomes =
  fromDate && toDate
    ? incomes.filter((income) => {
        const date = income.date.split("T")[0];

        return date >= fromDate && date <= toDate;
      })
    : [];

    const rangeExpenseTotal = rangeExpenses.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);


const rangeIncomeTotal = rangeIncomes.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);


const rangeBalance =
  rangeIncomeTotal - rangeExpenseTotal;



  console.log(rangeExpenses);
console.log(rangeIncomes);
console.log(rangeExpenseTotal);
console.log(rangeIncomeTotal);


    const selectedIncomes = selectedDate
  ? incomes.filter(
      (income) =>
        income.date.split("T")[0] === selectedDate
    )
  : [];

const totalExpense = selectedExpenses.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const totalIncome = selectedIncomes.reduce(
  (sum, item) => sum + Number(item.amount),
  0
);

const balance = totalIncome - totalExpense;

    return (
      <>
  <div className="bg-white rounded-2xl shadow-md p-6">

    {/* Header */}

    <div className="flex items-center justify-between mb-6">

      <button
        onClick={previousMonth}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        ←
      </button>

      <h2 className="text-2xl font-bold">
        {month} {currentYear}
      </h2>

      <button
        onClick={nextMonth}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        →
      </button>

    </div>


    {/* Calender range */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">

  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    className="border rounded-xl p-3"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    className="border rounded-xl p-3"
  />

  <button
    onClick={() => {
      if (!fromDate || !toDate) {
        alert("Select both dates");
        return;
      }

      setShowReport(true);
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
  >
    Generate Report
  </button>

</div>

    {/* Week Days */}

    <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 mb-4">

      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>

    </div>

    {/* Calendar */}

    <div className="grid grid-cols-7 gap-2">

      {Array.from({ length: firstDay }).map((_, index) => (
        <div key={`empty-${index}`}></div>
      ))}

      {Array.from({ length: daysInMonth }, (_, i) => {

        const day = i + 1;

        const dateKey =
          `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const isSelected =
          selectedDate === dateKey;

        return (

          <div
            key={dateKey}
           onClick={() => {
  setSelectedDate(dateKey);
  setShowModal(true);
}}
            className={`
              border
              rounded-xl
              h-20
              p-2
              cursor-pointer
              transition
              flex
              flex-col
              justify-between
              hover:bg-blue-50
              ${
                isSelected
                  ? "bg-blue-100 border-blue-500"
                  : ""
              }
            `}
          >

            <span className="font-semibold">
              {day}
            </span>

            {expenseByDate[dateKey] && (

              <span className="text-xs font-bold text-green-600">
                ৳{expenseByDate[dateKey]}
              </span>

            )}

          </div>

        );

      })}

    </div>


          {/* Selected Date Expenses */}

      {selectedDate && (
        <div className="mt-8 border-t pt-6">

          <h3 className="text-xl font-bold mb-4">
            Expenses on {selectedDate}
          </h3>

          {selectedExpenses.length === 0 ? (

            <p className="text-gray-500">
              No expenses found.
            </p>

          ) : (

            <>
              {selectedExpenses.map((expense) => (

                <div
                  key={expense._id}
                  className="flex justify-between items-center border-b py-3"
                >

                  <div>

                    <p className="font-semibold">
                      {expense.category}
                    </p>

                    <p className="text-sm text-gray-500">
                      {expense.note || "No note"}
                    </p>

                  </div>

                  <p className="font-bold text-green-600">
                    ৳{expense.amount}
                  </p>

                </div>

              ))}


              

              <div className="flex justify-between mt-5 text-lg font-bold">

                <span>Total</span>

                <span>
                  ৳
                  {selectedExpenses.reduce(
                    (sum, item) => sum + Number(item.amount),
                    0
                  )}
                </span>

              </div>

            </>

          )}

        </div>
      )}

    </div>
{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-2xl font-bold">
          📅 {selectedDate}
        </h2>

        <button
          onClick={() => setShowModal(false)}
          className="text-2xl hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="p-6">

        {/* Expenses */}
        <h3 className="text-xl font-bold text-red-600 mb-3">
          💸 Expenses
        </h3>

        {selectedExpenses.length === 0 ? (
          <p className="text-gray-500 mb-5">
            No expenses found.
          </p>
        ) : (
          selectedExpenses.map((expense) => (
            <div
              key={expense._id}
              className="flex justify-between border-b py-2"
            >
              <div>
                <p className="font-semibold">
                  {expense.category}
                </p>

                <p className="text-sm text-gray-500">
                  {expense.note}
                </p>
              </div>

              <p className="font-bold text-red-600">
                ৳{expense.amount}
              </p>
            </div>
          ))
        )}

        {/* Income */}
        <h3 className="text-xl font-bold text-green-600 mt-8 mb-3">
          💰 Income
        </h3>

        {selectedIncomes.length === 0 ? (
          <p className="text-gray-500">
            No income found.
          </p>
        ) : (
          selectedIncomes.map((income) => (
            <div
              key={income._id}
              className="flex justify-between border-b py-2"
            >
              <div>
                <p className="font-semibold">
                  {income.category}
                </p>

                <p className="text-sm text-gray-500">
                  {income.note}
                </p>
              </div>

              <p className="font-bold text-green-600">
                ৳{income.amount}
              </p>
            </div>
          ))
        )}

        {/* Summary */}
        <div className="mt-8 border-t pt-5 space-y-2">

          <div className="flex justify-between">
            <span>Total Income</span>

            <span className="font-bold text-green-600">
              ৳{totalIncome.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Total Expense</span>

            <span className="font-bold text-red-600">
              ৳{totalExpense.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-lg font-bold">

            <span>Balance</span>

            <span
              className={
                balance >= 0
                  ? "text-blue-600"
                  : "text-red-600"
              }
            >
              ৳{balance.toLocaleString()}
            </span>

          </div>

        </div>

      </div>
    </div>
  </div>
)}

{showReport && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 max-h-[85vh] overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center border-b p-6">
        <div>
          <h2 className="text-2xl font-bold">
            📊 Report
          </h2>

          <p className="text-gray-500 mt-1">
            {fromDate} → {toDate}
          </p>
        </div>

        <button
          onClick={() => setShowReport(false)}
          className="text-2xl hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="p-6">

        {/* Summary Cards */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-green-100 rounded-xl p-5">
            <p className="text-gray-600">Income</p>

            <h3 className="text-2xl font-bold text-green-700">
              ৳{rangeIncomeTotal.toLocaleString()}
            </h3>
          </div>

          <div className="bg-red-100 rounded-xl p-5">
            <p className="text-gray-600">Expense</p>

            <h3 className="text-2xl font-bold text-red-700">
              ৳{rangeExpenseTotal.toLocaleString()}
            </h3>
          </div>

          <div className="bg-blue-100 rounded-xl p-5">
            <p className="text-gray-600">Balance</p>

            <h3 className="text-2xl font-bold text-blue-700">
              ৳{rangeBalance.toLocaleString()}
            </h3>
          </div>

        </div>

        {/* Expenses */}

        <h3 className="text-xl font-bold mb-3">
          💸 Expenses
        </h3>

        {rangeExpenses.map((expense) => (
          <div
            key={expense._id}
            className="flex justify-between border-b py-2"
          >
            <div>
              <p className="font-semibold">
                {expense.category}
              </p>

              <p className="text-sm text-gray-500">
                {expense.date.split("T")[0]}
              </p>
            </div>

            <p className="font-bold">
              ৳{expense.amount}
            </p>
          </div>
        ))}

        {/* Income */}

        <h3 className="text-xl font-bold mt-8 mb-3">
          💰 Income
        </h3>

        {rangeIncomes.map((income) => (
          <div
            key={income._id}
            className="flex justify-between border-b py-2"
          >
            <div>
              <p className="font-semibold">
                {income.category}
              </p>

              <p className="text-sm text-gray-500">
                {income.date.split("T")[0]}
              </p>
            </div>

            <p className="font-bold text-green-600">
              ৳{income.amount}
            </p>
          </div>
        ))}

      </div>
    </div>
  </div>
)}
    </>
  );
}

export default CalendarView;






