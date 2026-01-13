const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const Content = require("../models/Content");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { q, region, status } = req.query;
  const filter = {};

  if (q && q.includes(":")) {
    console.warn("Suspicious query:", q);
  }

  filter.status = status || "PUBLISHED";
  if (region) filter.region = region;

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } }
    ];
  }

  try {
    const results = await Content.find(filter).populate("author tags project");
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});


module.exports = router;
