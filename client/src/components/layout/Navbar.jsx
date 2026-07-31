import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
      <div className="flex flex-wrap gap-3 justify-center">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-blue-100"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/income"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition ${
              isActive
                ? "bg-green-600 text-white"
                : "bg-gray-100 hover:bg-green-100"
            }`
          }
        >
          💰 Income
        </NavLink>

        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition ${
              isActive
                ? "bg-purple-600 text-white"
                : "bg-gray-100 hover:bg-purple-100"
            }`
          }
        >
          📋 Budget
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;