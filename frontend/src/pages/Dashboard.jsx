import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get("/incidents/mine");
        setIncidents(res.data.incidents);
      } catch (err) {
        console.log("FETCH ERROR:", err);
      }
    };

    fetchIncidents();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            FairFix Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <Link
          to="/incident/new"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded mb-6"
        >
          + Create New Incident
        </Link>

        <h2 className="text-lg font-semibold mb-3">
          Your Incidents
        </h2>

        {incidents.length === 0 ? (
          <p className="text-gray-500">No incidents yet.</p>
        ) : (
            incidents.map((incident) => (
            <Link
            to={`/incident/${incident._id}`}
            key={incident._id}
            className="block border p-3 rounded mb-3 bg-gray-50 hover:bg-gray-100"
            >
          <p><strong>Vehicle:</strong> {incident.vehicleType}</p>
          <p><strong>Status:</strong> {incident.status}</p>
        </Link>
        ))

        )}
      </div>
    </div>
  );
}
