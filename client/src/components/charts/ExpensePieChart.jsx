import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

function ExpensePieChart({ expenses }) {
  const grouped = {};

  expenses.forEach((expense) => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = 0;
    }

    grouped[expense.category] += Number(expense.amount);
  });

  const chartData = Object.keys(grouped).map((category) => ({
    name: category,
    value: grouped[category],
  }));

  return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6">
      Expense By Category
    </h2>

    {chartData.length === 0 ? (
      <p className="text-gray-500 text-center">
        No expense data available.
      </p>
    ) : (
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
);
}

export default ExpensePieChart;