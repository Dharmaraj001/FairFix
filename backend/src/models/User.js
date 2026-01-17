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
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
