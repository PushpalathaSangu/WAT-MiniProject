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
<<<<<<< HEAD
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// =======================
// Admin Profile (View)
// =======================


router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const adminId = req.user.id; // assuming token payload contains { id, name, ... }
    const admin = await Admin.findById(adminId).select('-password'); // avoid sending password
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    console.error('Error fetching admin profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});






=======
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});

>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
// =======================
// Admin Login
// =======================
<<<<<<< HEAD
router.put("/update", authenticateToken,authorizeRole('admin'),async (req, res) => {
 
  try {
    console.log(req.body);
    const { name, email, contactNumber } = req.body;
    const adminId = req.user.id;
    
    // Basic validation
    if (!name || !email || !contactNumber) {
=======
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
      return res.status(400).json({ 
        success: false,
        message: "Email and password required" 
      });
    }

<<<<<<< HEAD
    // Contact number validation
    if (!/^\d{10,15}$/.test(contactNumber)) {
      return res.status(400).json({
=======
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ 
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
        success: false,
        message: "Invalid credentials" 
      });
    }

<<<<<<< HEAD
    // Check if email exists for another admin
    const existingAdmin = await Admin.findOne({ email, _id: { $ne: adminId } });
    if (existingAdmin) {
      return res.status(400).json({
=======
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ 
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
        success: false,
        message: "Invalid credentials" 
      });
    }

<<<<<<< HEAD
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, contactNumber },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!updatedAdmin) {
      return res.status(404).json({ 
        success: false,
        message: "Admin not found" 
      });
    }

    // Return success response with updated data
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: updatedAdmin
=======
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
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});



module.exports = router;














=======
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
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
