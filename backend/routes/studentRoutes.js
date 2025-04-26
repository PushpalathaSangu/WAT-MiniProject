const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
const { authorizeRole } = require("../middleware/authorizeRole");
const verifyToken = require("../middleware/verifyToken"); // You need this middleware to get req.user

const router = express.Router();

// ✅ Login-protected route
router.get("/login", authorizeRole("student"), (req, res) => {
  res.json({ message: `Welcome, Student ${req.user.id}` });
});

// ✅ Student Registration Route
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    year,
    semester,
    section,
    studentId,
    rollNumber,
    phone,
  } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      year,
      semester,
      section,
      studentId,
      rollNumber,
      phone,
    });

    await student.save();
    res.status(201).json({ message: "Student registration successful" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Student Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { studentId: student._id, role: "student" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      student: {
        name: student.name,
        email: student.email,
        year: student.year,
        semester: student.semester,
        section: student.section,
        studentId: student.studentId,
        rollNumber: student.rollNumber,
        phone: student.phone,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Get Logged-in Student Profile
router.get("/profile", verifyToken, authorizeRole("student"), async (req, res) => {
  try {
    const student = await Student.findById(req.user.studentId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.facultyId)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid faculty ID format' 
    });
  }
  next();
};



// Route to get student by ID
router.get('/student/:id', async (req, res) => {
  const studentId = req.params.id;

  // Validate ObjectId before using it in the query
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// Route to get students by year
router.get('/year/:year', async (req, res) => {
  const { year } = req.params;

  try {
    const students = await Student.find({ year: year });

    res.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// ✅ Update Profile Route
router.put("/update-profile", verifyToken, authorizeRole("student"), async (req, res) => {
  try {
    const updatedFields = req.body;
    const student = await Student.findByIdAndUpdate(
      req.user.studentId,
      updatedFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Profile updated", student });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Logout Route (optional – frontend should just remove token)
router.post("/logout", (req, res) => {
  // If you're not using sessions, simply inform frontend to delete token
  res.json({ message: "Logout successful" });
});








// Get student details with WAT marks
router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
      .select('-password -createdAt -updatedAt -__v');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get WAT submissions with subject information
    const submissions = await WatSubmission.aggregate([
      { $match: { studentId: mongoose.Types.ObjectId(req.params.studentId) } },
      {
        $lookup: {
          from: 'wats',
          localField: 'watId',
          foreignField: '_id',
          as: 'watDetails'
        }
      },
      { $unwind: '$watDetails' },
      {
        $project: {
          _id: 1,
          score: 1,
          submittedAt: 1,
          subject: '$watDetails.subject',
          watTitle: '$watDetails.title',
          totalMarks: '$watDetails.totalMarks'
        }
      }
    ]);

    res.json({
      ...student._doc,
      watMarks: submissions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;



