// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const WAT = require('../models/Wat'); // Adjust path if needed

// // POST /api/wats/create
// router.post('/create', async (req, res) => {
//   try {
//     const {
//       facultyId,
//       year,
//       semester,
//       startTime,
//       endTime,
//       watNumber,
//       questions,
//       subject
//     } = req.body;

   

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(facultyId)) {
//       return res.status(400).json({ error: 'Invalid facultyId' });
//     }
    
   
//     console.log(req.body);
//     const wat = new WAT({
//       facultyId: new mongoose.Types.ObjectId(facultyId),
//       year,
//       semester,
//       questions: questions,
//       subject,
//       startTime,
//       endTime,
//       watNumber
//     });

//     await wat.save();
    
//     res.status(201).json({ message: 'WAT created successfully', wat });
//   } catch (error) {
//     console.error('Error creating WAT:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// router.get('/by-year/:year', async (req, res) => {
//   try {
//     const { year } = req.params;
//     const wats = await WAT.find({ year });
//     res.json(wats);
//   } catch (error) {
//     console.error('Error fetching WATs by year:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });




// module.exports = router;




const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WAT = require('../models/Wat'); // Adjust path if needed
const WatSubmission = require('../models/WatSubmission');

// POST /api/wats/create
router.post('/create', async (req, res) => {
  try {
    const {
      facultyId,
      year,
      semester,
      startTime,
      endTime,
      watNumber,
      questions,
      subject
    } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: 'Invalid facultyId' });
    }

    console.log(req.body);
    const wat = new WAT({
      facultyId: new mongoose.Types.ObjectId(facultyId),
      year,
      semester,
      questions,
      subject,
      startTime,
      endTime,
      watNumber
    });

    await wat.save();

    res.status(201).json({ message: 'WAT created successfully', wat });
  } catch (error) {
    console.error('Error creating WAT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/wats/by-year/:year
router.get('/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const wats = await WAT.find({ year });
    res.json(wats);
  } catch (error) {
    console.error('Error fetching WATs by year:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ NEW ROUTE: Get currently active WATs by year (startTime == current time)
router.get('/active/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const now = new Date();

    // Round to nearest minute (optional for stricter equality)
    const roundedNow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
      0
    );

    const wats = await WAT.find({
      year,
      startTime: { $lte: now },
      endTime: { $gte: now }
    });

    res.json(wats);
  } catch (error) {
    console.error('Error fetching active WATs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET WAT questions by ID
router.get('/questions/:id', async (req, res) => {
  try {
    const wat = await Wat.findById(req.params.id);
    if (!wat) {
      return res.status(404).json({ message: 'WAT not found' });
    }

    res.json(wat.questions); // assuming questions is an array in your WAT model
  } catch (error) {
    console.error('Fetch WAT questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/wats/:id    get the wat by id
router.get('/:id', async (req, res) => {
  try {
    const wat = await WAT.findById(req.params.id);
    if (!wat) {
      return res.status(404).json({ error: 'WAT not found' });
    }
    res.json(wat);
  } catch (error) {
    console.error('Error fetching WAT by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/:id/submit', async (req, res) => {
  try {
    const { answers, studentId } = req.body;
    const watId = req.params.id;

    if (!answers || !studentId) {
      return res.status(400).json({ error: 'Missing answers or studentId' });
    }

    const submission = new WatSubmission({
      watId,
      studentId,
      answers
    });

    await submission.save();
    res.status(201).json({ message: 'Submission successful' });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/submissions', async (req, res) => {
  try {
    const { id } = req.params;

    const submissions = await WatSubmission.find({ watId: id }).lean();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch submissions' });
  }
});



module.exports = router;
