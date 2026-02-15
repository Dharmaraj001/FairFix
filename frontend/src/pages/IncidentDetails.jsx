import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function IncidentDetails() {
  const { id } = useParams();
  const [damageType, setDamageType] = useState("DENT");
  const [affectedArea, setAffectedArea] = useState("BUMPER");
  const [result, setResult] = useState(null);

  const handleAssess = async () => {
    try {
      const res = await api.post("/assessments", {
        incidentId: id,
        vehicleType: "SEDAN", // temporary
        damageType,
        affectedArea
      });

      setResult(res.data.assessment);
    } catch (err) {
      alert(err.response?.data?.message || "Assessment failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Damage Assessment
      </h1>

      <select
        className="border p-2 mb-3"
        value={damageType}
        onChange={(e) => setDamageType(e.target.value)}
      >
        <option value="SCRATCH">Scratch</option>
        <option value="DENT">Dent</option>
        <option value="CRACK">Crack</option>
        <option value="MIXED">Mixed</option>
      </select>

      <select
        className="border p-2 mb-3 ml-2"
        value={affectedArea}
        onChange={(e) => setAffectedArea(e.target.value)}
      >
        <option value="BUMPER">Bumper</option>
        <option value="DOOR">Door</option>
        <option value="SIDE_PANEL">Side Panel</option>
        <option value="FRONT">Front</option>
        <option value="REAR">Rear</option>
      </select>

      <button
        onClick={handleAssess}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Estimate Cost
      </button>

      {result && (
        <div className="mt-4 border p-3 rounded bg-gray-50">
          <p><strong>Estimated Range:</strong> ₹{result.estimatedMinCost} - ₹{result.estimatedMaxCost}</p>
          <p><strong>Confidence:</strong> {result.confidenceLevel}</p>
        </div>
      )}
    </div>
  );
}
