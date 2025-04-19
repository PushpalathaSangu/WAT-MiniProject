const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const router = express.Router();
const {authorizeRole}  = require("../middleware/authorizeRole");

// Faculty-only route
router.get("/login", authorizeRole("faculty"), (req, res) => {
  res.json({ message: `Faculty courses for ${req.user.id}` });
});

// Faculty registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact, years, subjects } = req.body;

    if (!name || !email || !password || !contact || !years || !subjects) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Faculty.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      contact,
      years,
      subjects,
    });

    await faculty.save();
    res.status(201).json({ message: "Faculty registered successfully" });
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
      { facultyId: faculty._id, email: faculty.email, role: "faculty" },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      faculty: {
        name: faculty.name,
        email: faculty.email,
        contact: faculty.contact,
        years: faculty.years,
        subjects: faculty.subjects,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get faculty profile
// Get faculty profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid or missing token' });
    }

    const jwtToken = token.split(' ')[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || 'secretKey');

    const faculty = await Faculty.findById(decoded.facultyId);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.status(200).json({
      name: faculty.name,
      email: faculty.email,
      contact: faculty.contact,
      years: faculty.years,
      subjects: faculty.subjects,
    });
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get("/profile", async (req, res) => {
//   try {
//     const token = req.headers["authorization"];
//     if (!token || !token.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Invalid or missing token" });
//     }

//     const jwtToken = token.split(" ")[1];
//     const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "secretKey");

//     const faculty = await Faculty.findById(decoded.facultyId);
//     if (!faculty) {
//       return res.status(404).json({ message: "Faculty not found" });
//     }

//     res.status(200).json({
//       name: faculty.name,
//       email: faculty.email,
//       contact: faculty.contact,
//       years: faculty.years,
//       subjects: faculty.subjects,
//     });
//   } catch (error) {
//     console.error("Profile Fetch Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// Update faculty profile
router.put("/update-profile", async (req, res) => {
  try {
    const { name, contact, years, subjects } = req.body;
    const token = req.headers["authorization"];

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "secretKey");

    const faculty = await Faculty.findById(decoded.facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    faculty.name = name || faculty.name;
    faculty.contact = contact || faculty.contact;
    faculty.years = years || faculty.years;
    faculty.subjects = subjects || faculty.subjects;

    await faculty.save();

    res.status(200).json({ message: "Faculty profile updated successfully" });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete faculty account
router.delete("/delete-faculty", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    const jwtToken = token.split(" ")[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || "secretKey");

    const faculty = await Faculty.findByIdAndDelete(decoded.facultyId);
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
