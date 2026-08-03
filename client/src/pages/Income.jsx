import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import LoadingScreen from "../components/common/LoadingScreen";
import IncomeForm from "../components/income/IncomeForm";
import IncomeList from "../components/income/IncomeList";

function Income() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [incomeData, setIncomeData] = useState({
    category: "",
    amount: "",
    note: "",
    date: "",
  });

  const [incomes, setIncomes] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );


 const fetchIncome = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const response = await api.get("/income", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setIncomes(response.data.incomes);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const handleChange = (e) => {
  setIncomeData({
    ...incomeData,
    [e.target.name]: e.target.value,
  });
};

useEffect(() => {
  fetchIncome();
}, []);


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    let response;

    if (editingId) {
      response = await api.put(
        `/income/${editingId}`,
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      response = await api.post(
        "/income/add",
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    alert(response.data.message);

    fetchIncome();

    setIncomeData({
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


const editIncome = (income) => {
  setEditingId(income._id);

  setIncomeData({
    category: income.category,
    amount: income.amount,
    note: income.note,
    date: income.date.split("T")[0],
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


const deleteIncome = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this income?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(
      `/income/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    fetchIncome();
  } catch (error) {
    console.log(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Cannot connect to server.");
    }
  }
};


if (loading) {
  return (
    <LoadingScreen text="Loading Income..." />
  );
}

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
<Navbar />
  {/* Header */}

  <div className="flex justify-between items-center mb-8">

    <div>
      <h1 className="text-3xl font-bold">
        Income
      </h1>

      <p className="text-gray-500 mt-1">
        Manage your income sources
      </p>
    </div>

    <button
      onClick={() => navigate("/dashboard")}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
    >
      Dashboard
    </button>

  </div>

  {/* Summary */}

  <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg mb-8">

    <h2 className="text-lg">
      Total Income
    </h2>

    <p className="text-4xl font-bold mt-2">
      ৳ {totalIncome}
    </p>

  </div>

  {/* Form + List */}

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

    <div className="lg:col-span-1">

      <IncomeForm
        incomeData={incomeData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

    </div>

    <div className="lg:col-span-2">

      <IncomeList
        incomes={incomes}
        editIncome={editIncome}
        deleteIncome={deleteIncome}
      />

    </div>

  </div>

</div>
  );
}

export default Income;