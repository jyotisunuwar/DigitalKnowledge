const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

const router = express.Router();

/* ---------------------------------------------------
   CREATE COMMENT
--------------------------------------------------- */
router.post("/", auth, async (req, res) => {
  const { contentId, text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Comment text required" });
  }

  try {
    const comment = await Comment.create({
      content: contentId,
      author: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* ---------------------------------------------------
   GET ALL COMMENTS (ADMIN)
--------------------------------------------------- */
router.get("/", auth, async (req, res) => {
  try {
    const list = await Comment.find()
      .populate("author", "name role")
      .populate("content", "title");

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------------------------------------
   GET COMMENTS FOR A CONTENT ITEM
--------------------------------------------------- */
router.get("/:contentId", auth, async (req, res) => {
  try {
    const list = await Comment.find({ content: req.params.contentId })
      .populate("author", "name role");

    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
