import DamageAssessment from "../models/DamageAssessment.js";
import Incident from "../models/Incident.js";
import { estimateDamageCost } from "../services/damageEstimator.service.js";

export const assessDamage = async (req, res) => {
  try {
    const { incidentId, damageType, affectedArea } = req.body;
    const vehicleType = req.body.vehicleType; // will validate against incident later

    // 1️⃣ Basic input validation
    if (!incidentId || !damageType || !affectedArea || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 2️⃣ Check incident exists
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });
    }

    // 3️⃣ Ownership check (VERY IMPORTANT)
    if (incident.driver.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to assess this incident"
      });
    }

    // 4️⃣ Prevent assessment if already settled
    if (incident.status === "SETTLED") {
      return res.status(400).json({
        success: false,
        message: "Cannot assess a settled incident"
      });
    }

    // 5️⃣ Prevent duplicate assessments
    const existingAssessment = await DamageAssessment.findOne({
      incident: incidentId
    });

    if (existingAssessment) {
      return res.status(400).json({
        success: false,
        message: "Damage assessment already exists for this incident"
      });
    }

    // 6️⃣ Run estimation logic
    const estimation = estimateDamageCost({
      vehicleType,
      damageType,
      affectedArea
    });

    // 7️⃣ Save assessment
    const assessment = await DamageAssessment.create({
      incident: incidentId,
      damageType,
      affectedArea,
      estimatedMinCost: estimation.minCost,
      estimatedMaxCost: estimation.maxCost,
      confidenceLevel: estimation.confidence,
      notes: estimation.notes
    });

    // 8️⃣ Update incident status
    incident.status = "ASSESSMENT_DONE";
    await incident.save();

    res.status(201).json({
      success: true,
      assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
