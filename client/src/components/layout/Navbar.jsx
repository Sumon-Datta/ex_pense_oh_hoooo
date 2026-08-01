import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-4 mb-6">
      <div className="flex flex-wrap justify-center gap-3">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-blue-100 hover:scale-105"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/income"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isActive
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-green-100 hover:scale-105"
            }`
          }
        >
          💰 Income
        </NavLink>

        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isActive
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-purple-100 hover:scale-105"
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