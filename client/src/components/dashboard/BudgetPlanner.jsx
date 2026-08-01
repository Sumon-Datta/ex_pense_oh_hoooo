import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
function BudgetPlanner({ expenses }) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const DEFAULT_CATEGORIES = [
    "House Rent",
    "Bike",
    "Bazar",
    "Groceries",
    "Shopping",
    "Basay Pathano",
    "DPS",
  ];

  const CATEGORY_ICONS = {
    "House Rent": "🏠",
    Bike: "🏍️",
    Bazar: "🥬",
    Groceries: "🛒",
    Shopping: "🛍️",
    "Basay Pathano": "🏡",
    DPS: "💳",
  };

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const fetchBudget = async () => {
    try {
      const response = await api.get(`/budget/${currentMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedCategories = response.data.categories || [];

      if (savedCategories.length === 0) {
        setCategories(
          DEFAULT_CATEGORIES.map((item) => ({
            name: item,
            amount: 0,
            isDefault: true,
          })),
        );
      } else {
        const merged = savedCategories.map((item) => ({
          ...item,
          isDefault: DEFAULT_CATEGORIES.includes(item.name),
        }));

        DEFAULT_CATEGORIES.forEach((item) => {
          const exists = merged.find((c) => c.name === item);

          if (!exists) {
            merged.push({
              name: item,
              amount: 0,
              isDefault: true,
            });
          }
        });

        setCategories(merged);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [currentMonth]);

  const updateCategoryName = (index, value) => {
    const updated = [...categories];

    updated[index].name = value;

    setCategories(updated);
  };

  const updateCategoryAmount = (index, value) => {
  const updated = [...categories];
  updated[index].amount = value;
  setCategories(updated);
};

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: "",
        amount: 0,
        isDefault: false,
      },
    ]);
  };

  const deleteCategory = (index) => {
    const category = categories[index];

    if (category.isDefault) {
      return;
    }

    const updated = categories.filter((_, i) => i !== index);

    setCategories(updated);
  };

  const saveBudget = async () => {
    console.log("Save button clicked");
console.log(categories);
    try {
      setSaving(true);

      await api.post(
        "/budget",
        {
          month: currentMonth,
          categories: categories.map(({ isDefault, ...rest }) => rest),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Budget Saved Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const spentByCategory = useMemo(() => {
    const data = {};

    expenses.forEach((expense) => {
      const expenseMonth = expense.date.slice(0, 7);

      if (expenseMonth !== currentMonth) return;

      if (!data[expense.category]) {
        data[expense.category] = 0;
      }

      data[expense.category] += Number(expense.amount);
    });

    return data;
  }, [expenses, currentMonth]);

  const totalBudget = categories.reduce(
    (sum, category) => sum + Number(category.amount),
    0,
  );

  const totalSpent = Object.values(spentByCategory).reduce(
    (sum, value) => sum + value,
    0,
  );

  const totalRemaining = totalBudget - totalSpent;

  const totalCategories = categories.length;

  const overBudgetCategories = categories.filter((category) => {
    const spent = spentByCategory[category.name] || 0;
    return spent > Number(category.amount);
  }).length;

  const underBudgetCategories = categories.filter((category) => {
    const spent = spentByCategory[category.name] || 0;
    return spent <= Number(category.amount);
  }).length;

  const monthlySaving = totalRemaining > 0 ? totalRemaining : 0;

  const highestSpentCategory = Object.entries(spentByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const bestSavingCategory = categories.reduce(
    (best, category) => {
      const spent = spentByCategory[category.name] || 0;
      const saving = Number(category.amount) - spent;

      if (saving > best.saving) {
        return {
          name: category.name,
          saving,
        };
      }

      return best;
    },
    {
      name: "-",
      saving: -Infinity,
    },
  );

  const overBudgetList = categories.filter((category) => {
    const spent = spentByCategory[category.name] || 0;
    return spent > Number(category.amount);
  });

  const nearBudgetList = categories.filter((category) => {
    const spent = spentByCategory[category.name] || 0;
    const budget = Number(category.amount);

    if (budget === 0) return false;

    return spent / budget >= 0.8 && spent <= budget;
  });

  const budgetPercentage =
    totalBudget > 0
      ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100)
      : 0;

  let overallStatus = "";
  let overallColor = "";

  if (budgetPercentage >= 100) {
    overallStatus = "🚨 Budget Exceeded";
    overallColor = "text-red-600";
  } else if (budgetPercentage >= 80) {
    overallStatus = "⚠️ Near Budget Limit";
    overallColor = "text-yellow-600";
  } else {
    overallStatus = "✅ Budget Under Control";
    overallColor = "text-green-600";
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Monthly Budget</h2>

          <div className="mt-2">
            <input
              type="month"
              value={currentMonth}
              onChange={(e) => setCurrentMonth(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>

       
      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-gray-500">Total Budget</p>

          <h3 className="text-2xl font-bold text-blue-700">
            ৳{totalBudget.toLocaleString()}
          </h3>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-gray-500">Total Spent</p>

          <h3 className="text-2xl font-bold text-red-600">
            ৳{totalSpent.toLocaleString()}
          </h3>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-gray-500">Remaining</p>

          <h3
            className={`text-2xl font-bold ${
              totalRemaining >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ৳{totalRemaining.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* ui */}

      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-36 h-36">
            <svg className="w-36 h-36 -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="#e5e7eb"
                strokeWidth="12"
                fill="none"
              />

              <circle
                cx="72"
                cy="72"
                r="60"
                stroke={
                  budgetPercentage >= 100
                    ? "#ef4444"
                    : budgetPercentage >= 80
                      ? "#f59e0b"
                      : "#22c55e"
                }
                strokeWidth="12"
                fill="none"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * budgetPercentage) / 100}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold">{budgetPercentage}%</h2>

                <p className="text-sm text-gray-500">Used</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">Overall Budget Status</h2>

            <p className={`text-xl font-bold ${overallColor}`}>
              {overallStatus}
            </p>

            <div className="mt-5 space-y-2">
              <p>
                💰 Budget :<strong> ৳{totalBudget.toLocaleString()}</strong>
              </p>

              <p>
                💸 Spent :<strong> ৳{totalSpent.toLocaleString()}</strong>
              </p>

              <p>
                💵 Remaining :
                <strong> ৳{totalRemaining.toLocaleString()}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-blue-50 rounded-2xl p-5 shadow">
          <p className="text-gray-500">Categories</p>

          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            {totalCategories}
          </h2>
        </div>

        <div className="bg-green-50 rounded-2xl p-5 shadow">
          <p className="text-gray-500">Under Budget</p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {underBudgetCategories}
          </h2>
        </div>

        <div className="bg-red-50 rounded-2xl p-5 shadow">
          <p className="text-gray-500">Over Budget</p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {overBudgetCategories}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-5 shadow">
          <p className="text-gray-500">Monthly Saving</p>

          <h2 className="text-2xl font-bold text-yellow-600 mt-2">
            ৳{monthlySaving.toLocaleString()}
          </h2>
        </div>
      </div>

      {/*  */}

      <div className="grid lg:grid-cols-2 gap-5 mt-8">
        <div className="bg-indigo-50 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-bold mb-4">📊 Budget Insights</h2>

          <div className="space-y-3">
            <div>
              <p className="text-gray-500">Highest Spending</p>

              <h3 className="font-bold text-lg">
                {highestSpentCategory
                  ? `${highestSpentCategory[0]} (৳${highestSpentCategory[1].toLocaleString()})`
                  : "-"}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Best Saving</p>

              <h3 className="font-bold text-green-600">
                {bestSavingCategory.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5 shadow">
          <h2 className="text-xl font-bold mb-4">⚠ Budget Alerts</h2>

          <div className="space-y-2">
            {overBudgetList.length === 0 ? (
              <p className="text-green-600">✅ No Over Budget Category</p>
            ) : (
              overBudgetList.map((item) => (
                <div key={item.name} className="text-red-600 font-semibold">
                  ❌ {item.name}
                </div>
              ))
            )}

            {nearBudgetList.map((item) => (
              <div key={item.name} className="text-yellow-600 font-semibold">
                ⚠ {item.name} is near limit
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Table */}

      <div className=" hidden lg:block overflow-x-auto">
        <table className="min-w-[950px] w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-3">Category</th>

              <th className="text-center p-3">Budget</th>

              <th className="text-center p-3">Spent</th>

              <th className="text-center p-3">Status</th>
              <th className="text-center p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : (
              categories.map((category, index) => {
                const spent = spentByCategory[category.name] || 0;

                return (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {CATEGORY_ICONS[category.name] || "📁"}
                        </span>

                        <input
                          disabled={category.isDefault}
                          value={category.name}
                          onChange={(e) =>
                            updateCategoryName(index, e.target.value)
                          }
                          className={`border rounded-lg px-3 py-2 w-full ${
                            category.isDefault
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Category"
                        />
                      </div>
                    </td>

                    <td className="p-3">
                   <input
  type="number"
  value={category.amount === 0 ? "" : category.amount}
  onChange={(e) =>
    updateCategoryAmount(
      index,
      e.target.value === "" ? 0 : Number(e.target.value)
    )
  }
  className="border rounded-lg px-3 py-2 w-full text-center"
/>
                    </td>

                    <td className="p-3 text-center">
                      <p className="font-bold text-red-600">
                        ৳{spent.toLocaleString()}
                      </p>

                      <p className="text-xs text-gray-500">
                        of ৳{Number(category.amount).toLocaleString()}
                      </p>
                    </td>
                    <td className="p-3">
                      {(() => {
                        const budget = Number(category.amount);

                        const difference = budget - spent;

                        const percent =
                          budget > 0
                            ? Math.min((spent / budget) * 100, 100)
                            : 0;

                        return (
                          <div>
                            {budget === 0 ? (
                              <p className="text-gray-500 text-center">
                                No Budget
                              </p>
                            ) : difference > 0 ? (
                              <p className="text-green-600 font-bold text-center">
                                🟢 Save ৳{difference.toLocaleString()}
                              </p>
                            ) : difference < 0 ? (
                              <p className="text-red-600 font-bold text-center">
                                🔴 Short ৳
                                {Math.abs(difference).toLocaleString()}
                              </p>
                            ) : (
                              <p className="text-blue-600 font-bold text-center">
                                🔵 On Budget
                              </p>
                            )}

                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>0%</span>

                                <span>{Math.round(percent)}%</span>

                                <span>100%</span>
                              </div>

                              <div className="w-full h-3 bg-gray-200 rounded-full">
                                <div
                                  className={`h-3 rounded-full transition-all duration-500 ${
                                    difference < 0
                                      ? "bg-red-500"
                                      : difference === 0
                                        ? "bg-blue-500"
                                        : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${percent}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </td>

                    <td className="text-center p-3">
                      {category.isDefault ? (
                        <span className="text-gray-400 text-sm">Default</span>
                      ) : (
                        <button
                          onClick={() => deleteCategory(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
   <div className="lg:hidden space-y-4 mt-6">
  {categories.map((category, index) => {
    const spent = spentByCategory[category.name] || 0;

    const budget = Number(category.amount);

    const difference = budget - spent;

    const percent =
      budget > 0
        ? Math.min((spent / budget) * 100, 100)
        : 0;

    return (
      <div
        key={index}
        className="bg-white border rounded-2xl shadow p-4 w-full overflow-hidden"
      >
        {/* Category */}
        <div className="flex items-center gap-3 mb-4 w-full">

          <span className="text-2xl flex-shrink-0">
            {CATEGORY_ICONS[category.name] || "📁"}
          </span>

          {category.isDefault ? (
            <h3 className="font-bold text-lg truncate">
              {category.name}
            </h3>
          ) : (
            <input
              value={category.name}
              onChange={(e) =>
                updateCategoryName(index, e.target.value)
              }
              placeholder="Category"
              className="flex-1 min-w-0 border rounded-xl px-3 py-2"
            />
          )}
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="text-sm text-gray-500 font-medium">
            Budget
          </label>

          <input
            type="number"
            value={category.amount === 0 ? "" : category.amount}
            onChange={(e) =>
              updateCategoryAmount(
                index,
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
            className="w-full border rounded-xl px-3 py-2 mt-2"
          />
        </div>

        {/* Spent */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">
            Spent
          </span>

          <strong className="text-red-600">
            ৳{spent.toLocaleString()}
          </strong>
        </div>

        {/* Progress */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              difference < 0
                ? "bg-red-500"
                : difference === 0
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${percent}%`,
            }}
          />
        </div>

        {/* Status */}
        {budget === 0 ? (
          <p className="text-center text-gray-500">
            No Budget
          </p>
        ) : difference >= 0 ? (
          <p className="text-green-600 font-bold">
            ✅ Saved ৳{difference.toLocaleString()}
          </p>
        ) : (
          <p className="text-red-600 font-bold">
            ❌ Short ৳{Math.abs(difference).toLocaleString()}
          </p>
        )}

        {/* Delete Button */}
        {!category.isDefault && (
          <button
            onClick={() => deleteCategory(index)}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
          >
            Delete Category
          </button>
        )}
      </div>
    );
  })}
</div>
      <div className="mt-6 jus ">
        <button
          onClick={addCategory}
          className="w-full md:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          + Add Category
        </button>
        <div className="mt-6 flex flex-col md:flex-row gap-4">
  <button
    onClick={saveBudget}
    disabled={saving}
    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition"
  >
    {saving ? "Saving..." : "💾 Save Budget"}
  </button>
</div>
      
        
      </div>
    </div>
  );
}

export default BudgetPlanner;
