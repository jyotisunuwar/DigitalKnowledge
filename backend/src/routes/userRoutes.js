const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const auth = require('../middleware/auth');

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Create user error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(400).json({ message: err.message });
  }
});

// Get all users OR by region
router.get('/', async (req, res) => {
  const { region } = req.query;
  try {
    const users = region
      ? await userService.getUsersByRegion(region)
      : await userService.getAllUsers();

    res.json(users);
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(400).json({ message: err.message });
  }
});

// Delete user (protected: only SystemAdmin)
router.delete('/:id', auth('SystemAdmin'), async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
