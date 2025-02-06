const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../Models/User");
const Admin = require("../Models/Admin");

dotenv.config();
const router = express.Router();

// ✅ User Signup
router.post("/signup/user", async (req, res) => {
  const { user_name, email_or_phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ user_name, email_or_phone, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// ✅ Admin Signup (Requires Correct Unique ID)
router.post("/signup/admin", async (req, res) => {
  const { user_name, email_or_phone, password, unique_id } = req.body;

  // Get the predefined admin unique ID from .env
  const ADMIN_SECRET_ID = process.env.ADMIN_SECRET_ID;

  // Validate Unique ID
  if (unique_id !== ADMIN_SECRET_ID) {
    return res.status(403).json({ error: "Unauthorized: Invalid Admin Code" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ user_name, email_or_phone, password: hashedPassword, unique_id });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error registering admin" });
  }
});

// ✅ User & Admin Login
router.post("/login", async (req, res) => {
  const { user_name, password, userType, unique_id } = req.body;

  try {
    let user;

    if (userType === "admin") {
      // Validate Unique ID for Admin
      const ADMIN_SECRET_ID = process.env.ADMIN_SECRET_ID;
      if (unique_id !== ADMIN_SECRET_ID) {
        return res.status(403).json({ error: "Unauthorized: Invalid Admin Code" });
      }

      // Find Admin in DB
      user = await Admin.findOne({ user_name });
    } else {
      // Find User in DB
      user = await User.findOne({ user_name });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
