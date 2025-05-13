
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
<<<<<<< HEAD
const Student = require("../models/Student");
const WAT = require("../models/Wat");
const router = express.Router();
const authenticateToken =require('../middleware/authenticateToken')
=======
const Student = require('../models/Student');
const { authorizeRole } = require("../middleware/authorizeRole");
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

// Faculty registration
router.post("/register", async (req, res) => {
  const { name, email, password, years, subjects, contact } = req.body;

  try {
    // Validate years
    if (!years || !Array.isArray(years) || years.length === 0) {
      return res.status(400).json({ message: "At least one year must be assigned" });
    }

<<<<<<< HEAD
    // Validation
    if (!name || !email || !password || !contact || !years || !subjects) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if faculty exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(409).json({ 
        success: false,
        message: "Email already registered" 
      });
=======
    // Validate subjects structure
    if (!subjects || typeof subjects !== 'object') {
      return res.status(400).json({ message: "Subjects must be provided as a map" });
    }

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ message: "Email already registered" });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new faculty
    const faculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      years,
<<<<<<< HEAD
      subjects: new Map(Object.entries(subjects))
    });

    await faculty.save();
    
    res.status(201).json({ 
      success: true,
      message: "Faculty registered successfully" 
    });
=======
      subjects: new Map(Object.entries(subjects)),
      contact,
      role: 'faculty'
    });

    await faculty.save();
    res.status(201).json({ message: "Faculty registration successful" });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});

// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, contact, yearsHandling } = req.body;

//     // Validation
//     if (!name || !email || !password || !contact || !yearsHandling) {
//       return res.status(400).json({ 
//         success: false,
//         message: "All fields are required" 
//       });
//     }

//     // Check if faculty exists
//     const existingFaculty = await Faculty.findOne({ email });
//     if (existingFaculty) {
//       return res.status(409).json({ 
//         success: false,
//         message: "Email already registered" 
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Transform yearsHandling into years and subjects
//     const years = yearsHandling.map(item => item.year);
//     const subjects = {};
    
//     yearsHandling.forEach(yearData => {
//       yearData.semesters.forEach(semesterData => {
//         if (!subjects[yearData.year]) {
//           subjects[yearData.year] = {};
//         }
//         subjects[yearData.year][semesterData.semester] = semesterData.subjects;
//       });
//     });

//     // Create new faculty
//     const faculty = new Faculty({
//       name,
//       email,
//       password: hashedPassword,
//       contact,
//       years,
//       subjects
//     });

//     await faculty.save();
    
//     res.status(201).json({ 
//       success: true,
//       message: "Faculty registered successfully" 
//     });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ 
//       success: false,
//       message: "Server error",
//       error: error.message 
//     });
//   }
// });

// Faculty login


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ 
        success: false,
        message: "Faculty not found" 
      });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
<<<<<<< HEAD
      { 
        facultyId: faculty._id.toString(),
        email: faculty.email,
        role: "faculty" 
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: "1h",
        algorithm: "HS256"
      }
=======
      { id: faculty._id, email: faculty.email, role: "faculty" },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    );

    res.status(200).json({
      success: true,
      token,
      faculty: {
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        contact: faculty.contact,
        years: faculty.years,
<<<<<<< HEAD
        subjects: Object.fromEntries(faculty.subjects)
      }
=======
        subjects: Object.fromEntries(faculty.subjects),
      },
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error",
      error: error.message 
    });
  }
});



// // Get faculty profile
// router.get('/profile', authenticateToken, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.user.id).select('-password');
//     if (!faculty) {
//       return res.status(404).json({ message: 'Faculty not found' });
//     }
//     res.json(faculty);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });



// Get faculty profile (updated)
router.get('/profile', authenticateToken, async (req, res) => {
 
  try {
    const faculty = await Faculty.findById(req.user.id).select('-password');
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    // Convert subjects Map to array format
    const assignedSubjects = [];
    if (faculty.subjects instanceof Map) {
      for (const [yearSem, subjects] of faculty.subjects.entries()) {
        const [year, semester] = yearSem.split('-');
        subjects.forEach(subject => {
          assignedSubjects.push({
            year,
            semester,
            subject: subject.name || subject // Handle both object and string formats
          });
        });
      }
    }

    // Create response object
    const facultyData = faculty.toObject();
    facultyData.assignedSubjects = assignedSubjects;

    res.json(facultyData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

<<<<<<< HEAD

// Update faculty profile - CORRECTED VERSION
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { name, email, contact, years, subjects } = req.body;

    // Validate input data
    if (!name || !email || !contact) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and contact are required' 
      });
    }

    // Check if the email is already used by another faculty
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty && existingFaculty._id.toString() !== req.user.id) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is already in use by another faculty' 
      });
    }

    // Convert subjects object to Map if needed
    let subjectsMap = subjects;
    if (subjects && typeof subjects === 'object' && !(subjects instanceof Map)) {
      subjectsMap = new Map(Object.entries(subjects));
    }

    // Update the faculty profile
    const faculty = await Faculty.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        contact,
        years: years || [],
        subjects: subjectsMap || new Map()
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!faculty) {
      return res.status(404).json({ 
        success: false,
        message: 'Faculty not found' 
      });
    }

    res.status(200).json({ 
      success: true,
      message: 'Profile updated successfully',
      faculty 
    });
  } catch (error) {
    console.error('Update error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Server error updating profile',
      error: error.message 
    });
  }
});



//get all faculty
router.get('/all', async (req, res) => {  
  try {
    const faculty = await Faculty.find({}, { password: 0 });
    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Get assigned years for faculty
router.get('/assigned-years', authenticateToken, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id).select('years');
    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    
    res.status(200).json({ 
      success: true, 
      data: faculty.years 
    });
  } catch (error) {
    console.error("Error fetching assigned years:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Get students by year and section
router.get('/students/:year/:section', authenticateToken, async (req, res) => {
  try {
    const { year, section } = req.params;
    
    // Validate that faculty is assigned to this year
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty.years.includes(year)) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to view this year's students" 
      });
    }

    const students = await Student.find({ 
      year, 
      section 
    }).select('-password -createdAt -updatedAt -__v');

    res.status(200).json({ 
      success: true, 
      data: students 
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// routes/faculty.js
router.get('/students-by-year/:year', authenticateToken, async (req, res) => {
  try {
    const { year } = req.params;
    
    // Verify faculty is assigned to this year
    const faculty = await Faculty.findById(req.user.id);
    if (!faculty.years.includes(year)) {
      return res.status(403).json({ 
        success: false, 
        message: "Not authorized to view this year's students" 
      });
    }

    const students = await Student.find({ year })
      .select('studentId section name email')
      .sort('section');

    res.status(200).json({ 
      success: true, 
      data: students 
    });
  } catch (error) {
    console.error("Error fetching students by year:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Get all WATs for logged-in faculty
router.get('/wats', authenticateToken, async (req, res) => {
  try {
    const facultyId = req.user.id; // From JWT token
    
    console.log(`Fetching WATs for faculty: ${facultyId}`);
    
    // Find all WATs created by this faculty
    const wats = await WAT.find({ facultyId: facultyId })
                         .sort({ createdAt: -1 });
    
    console.log(`Found ${wats.length} WATs`);
    
    res.json({
      success: true,
      count: wats.length,
      data: wats
    });
  } catch (err) {
    console.error('Error fetching WATs:', {
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({
      success: false,
      message: 'Server error fetching WATs',
      error: err.message
    });
  }
});

module.exports = router;


// // facultyRoutes.js
// router.get('/wats/:year', authenticateToken, async (req, res) => {
//   try {
//     const { year } = req.params;
//     const facultyId = req.user.id; // From JWT token

//     // 1. Verify the faculty exists
//     const faculty = await Faculty.findById(facultyId);
//     if (!faculty) {
//       return res.status(404).json({ message: 'Faculty not found' });
//     }

//     // 2. Get all WATs for this faculty and year
//     const wats = await WAT.find({
//       facultyId: facultyId,
//       year: year
//     }).sort({ startTime: -1 });

//     // 3. If no WATs found, check if faculty is assigned to this year
//     if (wats.length === 0) {
//       const isAssignedToYear = faculty.years.includes(year);
//       if (!isAssignedToYear) {
//         return res.status(200).json([]); // Return empty array if not assigned
//       }
//     }

//     res.status(200).json(wats);

//   } catch (err) {
//     console.error('Error fetching WATs:', {
//       message: err.message,
//       stack: err.stack
//     });
//     res.status(500).json({ 
//       message: 'Server Error',
//       error: err.message 
//     });
//   }
// });
=======
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
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ message: "Invalid faculty ID" });
    }

    if (!name || !email || !contact) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

<<<<<<< HEAD


// Add this route to facultyRoutes.js
router.get('/:facultyId/years', authenticateToken, async (req, res) => {
  try {
    const facultyId = req.params.facultyId;
    
    // Verify the requesting faculty matches the token
    if (req.user.id !== facultyId) {
      return res.status(403).json({ 
        success: false,
        message: 'Unauthorized access' 
      });
    }

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ 
        success: false,
        message: 'Faculty not found' 
      });
    }

    res.json({
      success: true,
      years: faculty.years || []
    });
  } catch (err) {
    console.error('Error fetching faculty years:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});



// Route to get all WATs for a specific year
router.get('/wats/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const wats = await WAT.find({ year }).sort({ startTime: -1 });

    if (!wats || wats.length === 0) {
      return res.status(404).json({ success: false, message: `No WATs found for year ${year}` });
=======
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
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    }

    return res.status(200).json({ success: true, data: wats });
  } catch (err) {
    console.error('Error fetching WATs:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

<<<<<<< HEAD

=======
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
module.exports = router;