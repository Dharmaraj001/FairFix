import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    vehicleType: {
      type: String,
      enum: ["TWO_WHEELER", "HATCHBACK", "SEDAN", "SUV"],
      required: true
    },

    images: {
      type: [String], // image URLs
      required: true
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "ASSESSMENT_DONE",
        "MECHANIC_ASSIGNED",
        "SETTLED"
      ],
      default: "CREATED"
    }
  },
  { timestamps: true }
);

// Geo index for nearby mechanic search
incidentSchema.index({ location: "2dsphere" });

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;
