function IncomeForm({
  incomeData,
  handleChange,
  handleSubmit,
  editingId,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {editingId ? "Update Income" : "Add Income"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          name="category"
          value={incomeData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        >
          <option value="">Select Category</option>

          <option value="Salary">Salary</option>

          <option value="Bonus">Bonus</option>

          <option value="Business">Business</option>

          <option value="Freelancing">Freelancing</option>

          <option value="Investment">Investment</option>

          <option value="Gift">Gift</option>

          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={incomeData.amount}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="note"
          placeholder="Note"
          value={incomeData.note}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="date"
          name="date"
          value={incomeData.date}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          {editingId ? "Update Income" : "Add Income"}
        </button>

      </form>
    </div>
  );
}

export default IncomeForm;