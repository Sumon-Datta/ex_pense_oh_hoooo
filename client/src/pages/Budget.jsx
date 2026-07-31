import { useEffect, useState } from "react";
import BudgetPlanner from "../components/dashboard/BudgetPlanner";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";

function Budget() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data.expenses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Budget Planner
          </h1>

          <p className="text-gray-500 mt-2">
            Plan your monthly budget and track every category.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            Loading...
          </div>
        ) : (
          <BudgetPlanner expenses={expenses} />
        )}

      </div>
    </div>
  );
}

export default Budget;