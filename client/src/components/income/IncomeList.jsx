import IncomeCard from "./IncomeCard";

function IncomeList({
  incomes,
  editIncome,
  deleteIncome,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        My Income
      </h2>

      {incomes.length === 0 ? (
        <p className="text-gray-500">
          No income found.
        </p>
      ) : (
        incomes.map((income) => (
          <IncomeCard
            key={income._id}
            income={income}
            editIncome={editIncome}
            deleteIncome={deleteIncome}
          />
        ))
      )}

    </div>
  );
}

export default IncomeList;