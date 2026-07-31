import { useNavigate } from "react-router-dom";

function DashboardHeader({ user, logout }) {
  const navigate = useNavigate();
  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? "Good Morning ☀️"
      : today.getHours() < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <p className="text-blue-100 text-sm">
            {greeting}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Welcome back,
            <br />
            {user?.name}
          </h1>

          <p className="text-blue-100 mt-3">
            {formattedDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

  <button
    onClick={() => navigate("/dashboard")}
    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
  >
    🏠 Dashboard
  </button>

  <button
    onClick={() => navigate("/income")}
    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
  >
    💵 Income
  </button>

  <button
    onClick={() => navigate("/budget")}
    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition"
  >
    💰 Budget
  </button>

  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
    👤
  </div>

  <button
    onClick={logout}
    className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-xl hover:bg-blue-50 transition"
  >
    Logout
  </button>

</div>

      </div>
    </div>
  );
}

export default DashboardHeader;