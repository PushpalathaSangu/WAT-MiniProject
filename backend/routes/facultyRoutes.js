const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
const Student = require('../models/Student');
const { authorizeRole } = require("../middleware/authorizeRole");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

// Faculty registration
router.post("/register", async (req, res) => {
  const { name, email, password, years, subjects, contact } = req.body;

  try {
    // Validate years
    if (!years || !Array.isArray(years) || years.length === 0) {
      return res.status(400).json({ message: "At least one year must be assigned" });
    }

    // Validate subjects structure
    if (!subjects || typeof subjects !== 'object') {
      return res.status(400).json({ message: "Subjects must be provided as a map" });
    }

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      years,
      subjects: new Map(Object.entries(subjects)),
      contact,
      role: 'faculty'
    });

    await faculty.save();
    res.status(201).json({ message: "Faculty registration successful" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Faculty login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: faculty._id, email: faculty.email, role: "faculty" },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        contact: faculty.contact,
        years: faculty.years,
        subjects: Object.fromEntries(faculty.subjects),
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get faculty profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid faculty ID" });
    }

    const faculty = await Faculty.findById(req.user.id).select("-password");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Convert Map to object for response
    const facultyObj = faculty.toObject();
    facultyObj.subjects = Object.fromEntries(faculty.subjects);

    res.status(200).json(facultyObj);
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update faculty profile
router.put("/update", authenticateToken, authorizeRole('faculty'), async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const facultyId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ message: "Invalid faculty ID" });
    }

    if (!name || !email || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!/^\d{10,15}$/.test(contact)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }

    const existingFaculty = await Faculty.findOne({ email, _id: { $ne: facultyId } });
    if (existingFaculty) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      facultyId,
      { name, email, contact },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      faculty: updatedFaculty
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get faculty's assigned years
router.get('/:facultyId/years', async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ message: 'Invalid faculty ID' });
    }

    const faculty = await Faculty.findById(facultyId).select('years');
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    
    res.json({ years: faculty.years });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete faculty account
router.delete("/delete", authenticateToken, async (req, res) => {
  try {
    const facultyId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ message: "Invalid faculty ID" });
    }

    const faculty = await Faculty.findByIdAndDelete(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json({ message: "Faculty account deleted successfully" });
  } catch (error) {
    console.error("Delete Faculty Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;