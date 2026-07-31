function SummaryCards({
  totalIncome,
  totalExpense,
  balance,
  savingsRate,
}) {
  const cards = [
    {
      title: "Total Income",
      value: `৳ ${totalIncome.toLocaleString()}`,
      color: "bg-green-500",
      icon: "💰",
    },
    {
      title: "Total Expense",
      value: `৳ ${totalExpense.toLocaleString()}`,
      color: "bg-red-500",
      icon: "💸",
    },
    {
      title: "Current Balance",
      value: `৳ ${balance.toLocaleString()}`,
      color: "bg-blue-500",
      icon: "💵",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate}%`,
      color: "bg-purple-500",
      icon: "📈",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-2xl p-6 shadow-lg`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{card.title}</h3>

            <span className="text-3xl">
              {card.icon}
            </span>
          </div>

          <p className="text-3xl font-bold mt-6">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;