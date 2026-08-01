import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Budget from "./pages/Budget";


function App() {
  return (
    <Routes>
  <Route path="/" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
  path="/income"
  element={
    <ProtectedRoute>
      <Income />
    </ProtectedRoute>
  }
/>

  <Route
    path="/budget"
    element={
      <ProtectedRoute>
        <Budget />
      </ProtectedRoute>
    }
  />
</Routes>
  );
}

export default App;