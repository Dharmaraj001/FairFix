import Settlement from "../models/Settlement.js";
import Incident from "../models/Incident.js";
import User from "../models/User.js";

export const createSettlement = async (req, res) => {
  try {
    const { incidentId, mechanic, agreedAmount, location } = req.body;
    const driver = req.user._id;

    // 1️⃣ Basic validation
    if (!incidentId || !mechanic || !agreedAmount || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    if (agreedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid settlement amount"
      });
    }

    // 2️⃣ Fetch incident
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    // 3️⃣ Ownership check (CRITICAL)
    if (incident.driver.toString() !== driver.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to settle this incident"
      });
    }

    // 4️⃣ Ensure incident is assessed and not already settled
    if (incident.status === "SETTLED") {
      return res.status(400).json({
        success: false,
        message: "Incident already settled"
      });
    }

    if (incident.status !== "ASSESSMENT_DONE") {
      return res.status(400).json({
        success: false,
        message: "Incident not ready for settlement"
      });
    }

    // 5️⃣ Prevent duplicate settlement (extra safety)
    const existingSettlement = await Settlement.findOne({
      incident: incidentId
    });

    if (existingSettlement) {
      return res.status(400).json({
        success: false,
        message: "Settlement already exists for this incident"
      });
    }

    // 6️⃣ Validate mechanic
    const mechanicUser = await User.findById(mechanic);
    if (!mechanicUser || mechanicUser.role !== "MECHANIC") {
      return res.status(400).json({
        success: false,
        message: "Invalid mechanic"
      });
    }

    if (mechanicUser._id.toString() === driver.toString()) {
      return res.status(400).json({
        success: false,
        message: "Driver and mechanic cannot be the same user"
      });
    }

    // 7️⃣ Create settlement
    const settlement = await Settlement.create({
      incident: incidentId,
      driver,
      mechanic,
      agreedAmount,
      location
    });

    // 8️⃣ Update incident status
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
