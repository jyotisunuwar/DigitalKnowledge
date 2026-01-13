const mongoose = require("mongoose");

const RecommendationProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    preferenceVector: { type: [String], default: [] }, // simple list of tags/topics
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RecommendationProfile",
  RecommendationProfileSchema
);
