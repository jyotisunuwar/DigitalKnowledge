const Content = require("../models/Content");
const Tag = require("../models/Tag");
const Project = require("../models/Project");

async function createContent({ title, description, tags, projectId, filePath, author, region }) {
  // Business rule 1: at least one tag OR project
  if ((!tags || tags.length === 0) && !projectId) {
    throw new Error("Content requires at least one tag or a project");
  }

  // Process tags
  let tagIds = [];
  if (tags && tags.length > 0) {
    for (const name of tags) {
      const trimmed = name.trim();
      if (!trimmed) continue;

      let tag = await Tag.findOne({ name: trimmed });
      if (!tag) tag = await Tag.create({ name: trimmed });

      tagIds.push(tag._id);
    }
  }

  // Process project
  let project = null;
  if (projectId) {
    project = await Project.findById(projectId);
  }

  // Create content
  const content = await Content.create({
    title,
    description,
    status: "PENDING",
    author,
    region,
    project: project ? project._id : null,
    tags: tagIds,
    filePath,
    auditLog: [{ action: "UPLOADED", by: author }],
  });

  return content;
}

async function getContentById(id) {
  return Content.findById(id).populate("author tags project");
}

module.exports = { createContent, getContentById };
