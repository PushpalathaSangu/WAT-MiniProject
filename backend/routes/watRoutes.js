
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WAT = require('../models/Wat'); // Adjust path if needed
const WatSubmission = require('../models/WatSubmission');

// POST /api/wats/create
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
//       questions,
//       subject,
//       watNumber,
//       startTime: new Date(startTime), // ✅ Convert to Date
//       endTime: new Date(endTime)      // ✅ Convert to Date
//     });
    

//     await wat.save();

//     res.status(201).json({ message: 'WAT created successfully', wat });
//   } catch (error) {
//     console.error('Error creating WAT:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


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

//     if (!mongoose.Types.ObjectId.isValid(facultyId)) {
//       return res.status(400).json({ error: 'Invalid facultyId' });
//     }

//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     // 🔍 Check for overlapping WATs globally
//     const existingWAT = await WAT.findOne({
//       year,
//       semester,
//       subject,
//       $or: [
//         {
//           startTime: { $lt: end },
//           endTime: { $gt: start }
//         }
//       ]
//     });

//     if (existingWAT) {
//       return res.status(409).json({
//         error: 'WAT already scheduled in this time range',
//         existingWat: existingWAT
//       });
//     }

//     const wat = new WAT({
//       facultyId: new mongoose.Types.ObjectId(facultyId),
//       year,
//       semester,
//       subject,
//       watNumber,
//       questions,
//       startTime: start,
//       endTime: end
//     });

//     await wat.save();

//     res.status(201).json({ message: 'WAT created successfully', wat });

//   } catch (error) {
//     console.error('Error creating WAT:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

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

    // Input validation
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: 'Invalid facultyId' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate time range
    if (start >= end) {
      return res.status(400).json({ error: 'End time must be after start time' });
    }

    // Check if WAT with same number already exists for this subject/year/semester
    const duplicateWAT = await WAT.findOne({
      subject,
      year,
      semester,
      watNumber
    });

    if (duplicateWAT) {
      return res.status(409).json({
        error: `WAT #${watNumber} already exists for ${subject} in ${semester} ${year}`,
        existingWat: duplicateWAT
      });
    }

    // Check for overlapping WATs
    const existingWAT = await WAT.findOne({
      $or: [
        { startTime: { $lte: start }, endTime: { $gte: start } },
        { startTime: { $lte: end }, endTime: { $gte: end } },
        { startTime: { $gte: start }, endTime: { $lte: end } }
      ]
    });

    if (existingWAT) {
      return res.status(409).json({
        error: 'A WAT already exists during this time period',
        existingWat: {
          subject: existingWAT.subject,
          startTime: existingWAT.startTime,
          endTime: existingWAT.endTime,
          watNumber: existingWAT.watNumber
        }
      });
    }

    const wat = new WAT({
      facultyId: new mongoose.Types.ObjectId(facultyId),
      year,
      semester,
      subject,
      watNumber,
      questions,
      startTime: start,
      endTime: end
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
    console.log(`Fetching WATs for year: ${year}`);
    
    // Temporary: Return all WATs to verify connection is working
    const allWats = await WAT.find({});
    console.log('All WATs in DB:', allWats);
    
    // Then filter by year
    const wats = await WAT.find({ year: year });
    console.log('Filtered WATs:', wats);
    
    res.json(wats);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// router.get('/by-year/:year', async (req, res) => {
//   try {
//     const { year } = req.params;

//     const wats = await WAT.find({ year });
//     console.log("wats:",wats);
//     res.json(wats);
//   } catch (error) {
//     console.error('Error fetching WATs by year:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// GET /api/wats/active/by-year/:year
router.get('/active/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const now = new Date();

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

// // GET WAT questions by ID
// router.get('/questions/:id', async (req, res) => {
//   try {
//     const wat = await Wat.findById(req.params.id);
//     if (!wat) {
//       return res.status(404).json({ message: 'WAT not found' });
//     }

//     res.json(wat.questions); // assuming questions is an array in your WAT model
//   } catch (error) {
//     console.error('Fetch WAT questions error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// GET /api/wats/:id Get full WAT details including questions
router.get('/:id', async (req, res) => {
  try {
    const wat = await WAT.findById(req.params.id);
   
    if (!wat) {
      return res.status(404).json({ error: 'WAT not found' });
    }
    res.json(wat);  // Will return the full WAT with questions
  } catch (error) {
    console.error('Error fetching WAT by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// routes/wat.js (or similar)
router.post('/submit', async (req, res) => {
  const { watId, studentId, answers } = req.body;
  // console.log("Received submission:", req.body);

  if (!watId || !studentId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  try {
    const alreadySubmitted = await WatSubmission.findOne({ watId, studentId });
    if (alreadySubmitted) {
      return res.status(400).json({ error: 'Already submitted' });
    }

    const wat = await WAT.findById(watId);
    if (!wat) return res.status(404).json({ error: 'WAT not found' });

    let score = 0;
    answers.forEach(answer => {
      const question = wat.questions.find(q => q._id.toString() === answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        score++;
      }
    });

    const submission = new WatSubmission({
      watId,
      studentId,
      answers,
      score,
      submittedAt: new Date(),
    });

    await submission.save();
    const correctAnswers = wat.questions.map((q) => ({
      questionId: q._id.toString(),
      correctAnswer: q.correctAnswer,
    }));
    
    return res.status(200).json({ message: 'Submitted', score, correctAnswers });
  } catch (err) {
    console.error('Submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});




// Get all WAT submissions for a student
router.get('/:studentId', async (req, res) => {
  try {
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
      },
      { $sort: { submittedAt: -1 } }
    ]);

    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
