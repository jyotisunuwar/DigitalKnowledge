const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientName: { type: String, required: true },
  region: String,
});

module.exports = mongoose.model("Project", ProjectSchema);
