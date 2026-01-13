const Content = require("../models/Content");

/* ---------------------------------------------------
   APPROVE CONTENT
--------------------------------------------------- */
async function approveContent(contentId, approverId) {
  const content = await Content.findById(contentId);
  if (!content) throw new Error("Content not found");

  content.status = "PUBLISHED"; // coursework-compliant
  content.auditLog.push({
    action: "PUBLISHED",
    by: approverId,
    at: new Date(),
  });

  return content.save();
}

/* ---------------------------------------------------
   REJECT CONTENT
--------------------------------------------------- */
async function rejectContent(contentId, approverId, reason) {
  const content = await Content.findById(contentId);
  if (!content) throw new Error("Content not found");

  content.status = "REJECTED";
  content.auditLog.push({
    action: "REJECTED",
    by: approverId,
    notes: reason || "",
    at: new Date(),
  });

  return content.save();
}

/* ---------------------------------------------------
   GET PENDING CONTENT BY REGION
--------------------------------------------------- */
async function getPendingContentByRegion(region) {
  return Content.find({
    status: "PENDING",   // FIXED: correct status
    region,
  }).populate("author project");
}

module.exports = {
  approveContent,
  rejectContent,
  getPendingContentByRegion,
};
