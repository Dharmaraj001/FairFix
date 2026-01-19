import DamageAssessment from "../models/DamageAssessment.js";
import { estimateDamageCost } from "../services/damageEstimator.service.js";

export const assessDamage = async (req, res) => {
  try {
    const { incidentId, damageType, affectedArea } = req.body;
    const vehicleType = req.body.vehicleType; // OK for now

    const estimation = estimateDamageCost({
      vehicleType,
      damageType,
      affectedArea
    });

    const assessment = await DamageAssessment.create({
      incident: incidentId,
      damageType,
      affectedArea,
      estimatedMinCost: estimation.minCost,
      estimatedMaxCost: estimation.maxCost,
      confidenceLevel: estimation.confidence,
      notes: estimation.notes
    });

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
