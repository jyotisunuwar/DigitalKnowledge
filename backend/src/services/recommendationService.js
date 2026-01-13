// src/services/recommendationService.js
const Content = require("../models/Content");

module.exports = {
  async recommendForUser(user) {
    // Simple rule-based recommendation (mock AI)
    // Matches RecommendationProfile from CW1

    return await Content.find({
      region: user.region,
      status: "PUBLISHED",
    })
      .limit(5)
      .sort({ createdAt: -1 });
  }
};
