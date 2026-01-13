// src/routes/recommendationRoutes.js
const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const recommendationService = require("../services/recommendationService");

const router = express.Router();

// Get recommendations for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const recs = await recommendationService.recommendForUser(req.user);
    res.json(recs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
