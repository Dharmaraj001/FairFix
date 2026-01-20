import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateIncident() {
  const [vehicleType, setVehicleType] = useState("SEDAN");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images || images.length === 0) {
  alert("Please upload at least one image");
  return;
}


    const imageUrls = Array.from(images).map(
  (file) => file.name
);


    try {
      await api.post("/incidents", {
        vehicleType,
        images: imageUrls,
        location: {
          type: "Point",
          coordinates: [77.5946, 12.9716] // static for MVP
        }
      });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Incident creation failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Create Incident
        </h2>

        <select
          className="w-full border p-2 mb-4"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="TWO_WHEELER">Two Wheeler</option>
          <option value="HATCHBACK">Hatchback</option>
          <option value="SEDAN">Sedan</option>
          <option value="SUV">SUV</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full mb-4"
          onChange={(e) => setImages(e.target.files)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Submit Incident
        </button>
      </form>
    </div>
  );
}
