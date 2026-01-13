const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./src/models/User");

mongoose.connect("mongodb://127.0.0.1:27017/dkn");

async function seed() {
  try {
    // Clear existing users (optional)
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Helper to create users
    const createUser = async (email, name, role, region, password) => {
      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({ email, name, role, region, passwordHash });
      console.log(`Created: ${email} (${role})`);
    };

    // Create all roles
    await createUser(
      "admin@dkn.com",
      "Admin User",
      "ADMIN",
      "UK",
      "admin123"
    );

    await createUser(
      "supervisor@dkn.com",
      "Knowledge Supervisor",
      "KNOWLEDGE_SUPERVISOR",
      "UK",
      "test123"
    );

    await createUser(
      "senior@dkn.com",
      "Senior Consultant",
      "SENIOR_CONSULTANT",
      "UK",
      "test123"
    );

    await createUser(
      "contributor@dkn.com",
      "Contributor User",
      "CONSULTANT",
      "UK",
      "test123"
    );

    console.log("All users created successfully");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

seed();
