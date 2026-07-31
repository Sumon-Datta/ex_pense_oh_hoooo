import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SummaryCards from "../components/dashboard/SummaryCards";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import ExpenseList from "../components/dashboard/ExpenseList";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import CalendarView from "../components/dashboard/CalendarView";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import RecentIncome from "../components/dashboard/RecentIncome";
import RecentExpenses from "../components/dashboard/RecentExpenses";
// import BudgetPlanner from "../components/dashboard/BudgetPlanner";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    note: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const [incomes, setIncomes] = useState([]);
  const [budgetCategories, setBudgetCategories] = useState([]);
  const fetchBudgetCategories = async () => {
  try {
    const token = localStorage.getItem("token");

    const currentMonth = new Date().toISOString().slice(0, 7);

    const response = await api.get(`/budget/${currentMonth}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBudgetCategories(response.data.categories || []);
  } catch (error) {
    console.log(error);
  }
};
  const [totalIncome, setTotalIncome] = useState(0);

  const balance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

  const fetchIncome = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Save all incomes
      setIncomes(response.data.incomes);

      // Calculate total income
      const total = response.data.incomes.reduce(
        (sum, income) => sum + Number(income.amount),
        0,
      );

      setTotalIncome(total);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTransactions = expenses.length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpense = expenses
    .filter((expense) => {
      const expenseDate = new Date(expense.date);

      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + Number(expense.amount), 0);

  const expenseByDate = expenses.reduce((acc, expense) => {
    const date = expense.date.split("T")[0];

    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += Number(expense.amount);

    return acc;
  }, {});

  console.log(expenseByDate);

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let response;

      if (editingId) {
        response = await api.put(`/expenses/${editingId}`, expenseData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await api.post("/expenses/add", expenseData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert(response.data.message);

      fetchExpenses();

      setExpenseData({
        category: "",
        amount: "",
        note: "",
        date: "",
      });
      setEditingId(null);
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Cannot connect to server.");
      }
    }
  };

  useEffect(() => {
  fetchExpenses();
  fetchIncome();
  fetchBudgetCategories();
}, []);

  const editExpense = (expense) => {
    setEditingId(expense._id);

    setExpenseData({
      category: expense.category,
      amount: expense.amount,
      note: expense.note,
      date: expense.date.split("T")[0],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteExpense = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await api.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);

      fetchExpenses();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Cannot connect to server.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}

      <DashboardHeader user={user} logout={logout} />

      <SummaryCards
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        balance={balance}
        savingsRate={savingsRate}
      />

      <div className="m-4">
        <AnalyticsCards expenses={expenses} />
      </div>

      {/* Add Expense */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm
  expenseData={expenseData}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  editingId={editingId}
  categories={budgetCategories}
/>
        </div>

        <div className="lg:col-span-2">
          <ExpenseList
            expenses={expenses}
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            editExpense={editExpense}
            deleteExpense={deleteExpense}
          />
        </div>
        <div className="mt-6">
          <CalendarView
    expenses={expenses}
    incomes={incomes}
    expenseByDate={expenseByDate}
/>

          <div className="mt-6">
            <ExpensePieChart expenses={expenses} />
          </div>
          <div className="mt-6">
            <MonthlyBarChart expenses={expenses} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <RecentIncome incomes={incomes} />

          <RecentExpenses expenses={expenses} />
          
        </div>
        <div className="mt-8">
  {/* <BudgetPlanner
    expenses={expenses}
/> */}
</div>
      </div>
    </div>
  );
}

export default Dashboard;
