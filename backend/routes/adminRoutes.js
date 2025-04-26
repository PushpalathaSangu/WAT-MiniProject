const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');



// =======================
// Admin Registration
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contactNumber } = req.body;

    // Validation
    if (!name || !email || !password || !contactNumber) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ 
        success: false,
        message: "Admin already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      contactNumber
    });

    await admin.save();
    
    res.status(201).json({ 
      success: true,
      message: "Admin registered successfully" 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});

// =======================
// Admin Login
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password required" 
      });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
});

// =======================
// Admin Profile (PROTECTED ROUTE)
// =======================
router.get("/profile", 
  authenticateToken, 
  authorizeRole("admin"), 
  async (req, res) => {
    try {
      const admin = await Admin.findById(req.user.adminId).select("-password");
      if (!admin) {
        return res.status(404).json({ 
          success: false,
          message: "Admin not found" 
        });
      }
      res.status(200).json({ 
        success: true,
        admin 
      });
    } catch (error) {
      console.error("Profile error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error" 
      });
    }
  }
);

// =======================
// Admin Update 
// =======================
router.put("/update",
  authenticateToken, 
  authorizeRole("admin"), 
  async (req, res) => {
    try {
      const { name, email, contactNumber } = req.body;
      const updates = { name, email, contactNumber };

      // Validation
      if (!name || !email || !contactNumber) {
        return res.status(400).json({ 
          success: false,
          message: "All fields are required" 
        });
      }

      const admin = await Admin.findByIdAndUpdate(
        req.user.adminId,
        updates,
        { new: true, runValidators: true }
      ).select("-password");

      if (!admin) {
        return res.status(404).json({ 
          success: false,
          message: "Admin not found" 
        });
      }

      res.status(200).json({
        success: true,
        message: "Profile updated",
        admin
      });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ 
        success: false,
        message: "Server error",
        error: error.message 
      });
    }
  }
);


module.exports = router;