const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { authorizeRole } = require("../middleware/authorizeRole");
const router = express.Router();

// =======================
// Admin Registration
// =======================
router.post("/register", async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    await newAdmin.save();
    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin-only route
router.get("/login", authorizeRole("admin"), (req, res) => {
  res.json({ message: "Admin data accessed" });
});


// =======================
// Admin Login
// =======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin with this email does not exist." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id, role: "admin" }, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// Admin Profile (View)
// =======================
router.get("/profile", authorizeRole("admin"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.adminId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// Admin Profile (Update)
// =======================
router.put("/update", authorizeRole("admin"), async (req, res) => {
  const { name, email, contactNumber } = req.body;

  try {
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.contactNumber = contactNumber || admin.contactNumber;

    await admin.save();
    res.json({ success: true, message: "Profile updated", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// Admin Logout
// =======================
router.post("/logout", authorizeRole("admin"), (req, res) => {
  // Frontend should delete the token
  res.status(200).json({ message: "Logout successful" });
});

// =======================
// Assign Subjects to Semester
// =======================
router.post("/assign-subjects", authorizeRole("admin"), async (req, res) => {
  const { semester, subjects } = req.body;

  if (!semester || !Array.isArray(subjects)) {
    return res.status(400).json({ message: "Semester and subjects are required" });
  }

  try {
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.assignedSubjects.set(semester, subjects);
    await admin.save();

    res.json({ success: true, message: `Subjects assigned for semester ${semester}` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// Get All Assigned Subjects
// =======================
router.get("/assigned-subjects", authorizeRole("admin"), async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ assignedSubjects: admin.assignedSubjects });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;




















// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");
// const router = express.Router();
// const  {authorizeRole} = require("../middleware/authorizeRole");


// // Admin-only route
// router.get("/login", authorizeRole("admin"), (req, res) => {
//   res.json({ message: "Admin data accessed" });
// });

// // POST request to register an admin
// router.post("/register", async (req, res) => {
//   const { name, email, password, contactNumber } = req.body;

//   try {
//     // Check if the admin already exists
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ message: "Admin with this email already exists." });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new admin
//     const newAdmin = new Admin({
//       name,
//       email,
//       password: hashedPassword,
//       contactNumber
//     });

//     await newAdmin.save();
//     res.status(201).json({ success: true, message: "Admin registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST request to login an admin
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the admin exists
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ message: "Admin with this email does not exist." });
//     }

//     // Compare password with hashed password in the database
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ adminId: admin._id, role: "admin" }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });

//     // Send token in the response
//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
