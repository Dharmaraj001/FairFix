import Incident from "../models/Incident.js";

export const createIncident = async (req, res) => {
  try {
    const { driver, location, vehicleType, images } = req.body;

    const incident = await Incident.create({
      driver: req.user._id, 
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
