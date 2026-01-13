const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["CONSULTANT", "SENIOR_CONSULTANT", "KNOWLEDGE_SUPERVISOR", "ADMIN"],
      required: true,
    },
    region: { type: String, required: true },
    passwordHash: { type: String, required: true }, // stands in for SSO in this coursework
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", UserSchema);
