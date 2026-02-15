import Incident from "../models/Incident.js";

export const createIncident = async (req, res) => {
  try {
    const { location, vehicleType, images } = req.body;

    if (!location || !vehicleType || !images?.length) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const incident = await Incident.create({
      driver: req.user._id,   // ✅ comes ONLY from token 
      location,
      vehicleType,
      images
    });

    res.status(201).json({
      success: true,
      incident
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMyIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({
      driver: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      incidents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

