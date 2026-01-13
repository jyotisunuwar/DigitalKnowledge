const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { auth } = require("../middleware/authMiddleware");
const { createContent } = require("../services/contentService");
const Content = require("../models/Content");

const router = express.Router();

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    ),
});

const upload = multer({ storage });

/* ---------------------------------------------------
   1. UPLOAD CONTENT
--------------------------------------------------- */
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, description, tags, project } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!req.file) return res.status(400).json({ message: "File required" });

    const tagList = tags ? tags.split(",") : [];

    const content = await createContent({
      title,
      description,
      tags: tagList,
      project: project && project.length === 24 ? project : null,
      filePath: req.file.path,
      author: req.user._id,
      region: req.user.region,
      status: "PENDING",
    });

    // AUDIT LOG
    content.auditLog.push({
      action: "UPLOADED",
      by: req.user._id,
      at: new Date(),
    });
    await content.save();

    res.status(201).json(content);
  } catch (err) {
    console.log("UPLOAD ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
});

/* ---------------------------------------------------
   2. GET ALL CONTENT (Dashboard list)
--------------------------------------------------- */
router.get("/", auth, async (req, res) => {
  try {
    const contents = await Content.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: "Failed to load content" });
  }
});
/* ---------------------------------------------------
   SEARCH CONTENT
--------------------------------------------------- */
router.get("/search", auth, async (req, res) => {
  try {
    const q = req.query.q?.trim();

    if (!q) {
      return res.json([]); // empty search
    }

    const results = await Content.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } }
      ],
      status: "PUBLISHED" // only show approved content
    }).sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});


/* ---------------------------------------------------
   3. GET PENDING CONTENT (Approvals)
--------------------------------------------------- */
router.get("/pending", auth, async (req, res) => {
  try {
    const allowedRoles = ["ADMIN", "SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const pendingItems = await Content.find({ status: "PENDING" }).sort({ createdAt: -1 });
    res.json(pendingItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------------------------------------
   4. APPROVE CONTENT
--------------------------------------------------- */
router.post("/approve/:id", auth, async (req, res) => {
  try {
    const allowedRoles = ["ADMIN", "SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Not found" });

    content.status = "PUBLISHED";

    // AUDIT LOG
    content.auditLog.push({
      action: "PUBLISHED",
      by: req.user._id,
      at: new Date(),
    });

    await content.save();

    res.json({ message: "Published", content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------------------------------------
   5. REJECT CONTENT
--------------------------------------------------- */
router.post("/reject/:id", auth, async (req, res) => {
  try {
    const allowedRoles = ["ADMIN", "SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { reason } = req.body;

    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Not found" });

    content.status = "REJECTED";

    // AUDIT LOG
    content.auditLog.push({
      action: "REJECTED",
      by: req.user._id,
      notes: reason || "",
      at: new Date(),
    });

    await content.save();

    res.json({ message: "Content rejected", content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) return res.status(404).json({ message: "Content not found" });

    // Check ownership
    if (
      !content.author ||
      content.author.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "You are not allowed to delete this content" });
    }

    // Log audit before deletion
    await Content.updateOne(
      { _id: req.params.id },
      {
        $push: {
          auditLog: {
            action: "DELETED",
            by: req.user._id,
            at: new Date(),
          },
        },
      }
    );

    await Content.deleteOne({ _id: req.params.id });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err.message);
    res.status(500).json({ message: "Server error during delete" });
  }
});


/* ---------------------------------------------------
   7. ARCHIVE CONTENT
--------------------------------------------------- */
router.post("/:id/archive", auth, async (req, res) => {
  try {
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { status: "ARCHIVED" },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // AUDIT LOG
    content.auditLog.push({
      action: "ARCHIVED",
      by: req.user._id,
      at: new Date(),
    });
    await content.save();

    res.json({ message: "Archived successfully", content });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ---------------------------------------------------
   8. UPDATE CONTENT
--------------------------------------------------- */
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({ message: "Invalid content ID" });
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const formattedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : [];

    const content = await Content.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    content.title = title;
    content.description = description;
    content.tags = formattedTags;

    // AUDIT LOG
    content.auditLog.push({
      action: "UPDATED",
      by: req.user._id,
      at: new Date(),
    });

    await content.save();

    res.json(content);
  } catch (err) {
    console.error("UPDATE ERROR:", err.message);
    res.status(500).json({ message: "Server error during update" });
  }
});

/* ---------------------------------------------------
   8. GET CONTENT BY ID (ContentDetails page)
--------------------------------------------------- */
router.get("/:id", auth, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate("author", "name")
      .populate("auditLog.by", "name"); // <-- ADD THIS

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 

/* ---------------------------------------------------
   10. GET FILE
--------------------------------------------------- */
router.get("/:id/file", auth, async (req, res) => {
  try {
    const allowedRoles = ["ADMIN", "SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const content = await Content.findById(req.params.id);
    if (!content || !content.filePath) {
      return res.status(404).send("File not found");
    }

    const absolutePath = path.join(__dirname, "..", "..", content.filePath);
    res.sendFile(absolutePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
