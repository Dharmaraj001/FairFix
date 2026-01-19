import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["DRIVER", "MECHANIC", "ADMIN"],
      default: "DRIVER"
    },
    location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number] // [longitude, latitude]
  }
}

  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);
export default User;
