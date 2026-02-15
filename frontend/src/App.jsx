import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateIncident from "./pages/CreateIncident";
import ProtectedRoute from "./components/ProtectedRoute";
import IncidentDetails from "./pages/IncidentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/incident/new"
          element={
            <ProtectedRoute>
              <CreateIncident />
            </ProtectedRoute>
          }
        />

        <Route
    path="/incident/:id"
    element={
      <ProtectedRoute>
        <IncidentDetails />
      </ProtectedRoute>
    }
  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
