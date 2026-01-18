import mongoose from "mongoose";

const damageAssessmentSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
      unique: true
    },

    damageType: {
      type: String,
      enum: ["SCRATCH", "DENT", "CRACK", "MIXED"],
      required: true
    },

    affectedArea: {
      type: String,
      enum: ["BUMPER", "DOOR", "SIDE_PANEL", "REAR", "FRONT"],
      required: true
    },

    estimatedMinCost: {
      type: Number,
      required: true
    },

    estimatedMaxCost: {
      type: Number,
      required: true
    },

    confidenceLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM"
    },

    notes: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const DamageAssessment = mongoose.model(
  "DamageAssessment",
  damageAssessmentSchema
);

export default DamageAssessment;
