import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-slate-900 text-white h-screen w-64 p-6">

      <h1 className="text-2xl font-bold mb-10">
        Expense Tracker
      </h1>

      <nav className="space-y-3">

        <Link
          to="/dashboard"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/income"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          💰 Income
        </Link>

        <Link
          to="/calendar"
          className="block p-3 rounded-lg hover:bg-slate-700"
        >
          📅 Calendar
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;