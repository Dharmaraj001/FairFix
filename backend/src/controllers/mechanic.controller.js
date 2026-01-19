import User from "../models/User.js";

export const findNearbyMechanics = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    const mechanics = await User.find({
      role: "MECHANIC",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: 5000 // 5 km
        }
      }
    }).select("-password");

    res.json({
      success: true,
      mechanics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
