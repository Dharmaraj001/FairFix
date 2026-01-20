import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <Link
        to="/incident/new"
        className="inline-block bg-green-600 text-white px-4 py-2 rounded"
      >
        Create Incident
      </Link>
    </div>
  );
}
