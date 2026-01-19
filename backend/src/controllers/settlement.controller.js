import Settlement from "../models/Settlement.js";
import Incident from "../models/Incident.js";

export const createSettlement = async (req, res) => {
  try {
    const { incidentId, mechanic, agreedAmount, location } = req.body;

    const driver = req.user._id;

    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    const settlement = await Settlement.create({
      incident: incidentId,
      driver,
      mechanic,
      agreedAmount,
      location
    });

    incident.status = "SETTLED";
    await incident.save();

    res.status(201).json({
      success: true,
      settlement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
