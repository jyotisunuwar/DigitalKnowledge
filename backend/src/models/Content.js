const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
  type: String,
  enum: ["PENDING", "PUBLISHED", "REJECTED", "ARCHIVED"],
  default: "PENDING",
},
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    region: { type: String, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },

    // FIXED TAGS FIELD
    tags: [{ type: String }],

    filePath: { type: String, required: true },
    auditLog: [
      {
        action: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        at: { type: Date, default: Date.now },
        notes: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
