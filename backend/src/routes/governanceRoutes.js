const express = require("express");
const { auth, requireRole } = require("../middleware/authMiddleware");
const {
  approveContent,
  rejectContent,
  getPendingContentByRegion,
} = require("../services/governanceService");

const router = express.Router();

const approverRoles = ["SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR", "ADMIN"];

router.get("/queue", auth, requireRole(...approverRoles), async (req, res) => {
  const items = await getPendingContentByRegion(req.user.region);
  res.json(items);
});

router.post("/:id/approve", auth, requireRole(...approverRoles), async (req, res) => {
  try {
    const updated = await approveContent(req.params.id, req.user._id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/:id/reject", auth, requireRole(...approverRoles), async (req, res) => {
  const { reason } = req.body;
  try {
    const updated = await rejectContent(req.params.id, req.user._id, reason);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
