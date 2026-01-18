import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema(
  {
    incident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true,
      unique: true
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    mechanic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    agreedAmount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
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

    receiptUrl: {
      type: String
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED"],
      default: "CONFIRMED"
    }
  },
  { timestamps: true }
);

// Geo proof of settlement
settlementSchema.index({ location: "2dsphere" });

const Settlement = mongoose.model("Settlement", settlementSchema);
export default Settlement;
