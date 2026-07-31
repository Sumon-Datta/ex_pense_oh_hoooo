import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function MonthlyBarChart({ expenses }) {

    const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const monthlyTotals = Array(12).fill(0);

expenses.forEach((expense) => {
  const date = new Date(expense.date);
  const month = date.getMonth();

  monthlyTotals[month] += Number(expense.amount);
});

const chartData = months.map((month, index) => ({
  month,
  expense: monthlyTotals[index],
}));

return (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-2xl font-bold mb-6">
      Monthly Expense
    </h2>

    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="expense"
            fill="#3B82F6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)};

export default MonthlyBarChart;