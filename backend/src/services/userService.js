// src/services/userService.js
const User = require("../models/User");

async function getUserById(id) {
  return User.findById(id);
}

async function getUsersByRegion(region) {
  return User.find({ region });
}

async function getUserRole(id) {
  const user = await User.findById(id);
  return user ? user.role : null;
}

module.exports = { getUserById, getUsersByRegion, getUserRole };
