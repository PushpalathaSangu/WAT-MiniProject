const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WAT = require('../models/Wat');
const WatSubmission = require('../models/WatSubmission');
const authenticateToken =require('../middleware/authenticateToken')

<<<<<<< HEAD

// Update WAT creation endpoint
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { year, semester, subject, watNumber, startTime, endTime } = req.body;

    // Validate required fields
    if (!year || !semester || !subject || !watNumber || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
=======
// create a new WAT
router.post('/create', async (req, res) => {
  try {
    const { facultyId, year, semester, startTime, endTime, watNumber, questions, subject } = req.body;

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: 'Invalid facultyId' });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
    }
    const start = new Date(startTime), end = new Date(endTime);
    if (start >= end) return res.status(400).json({ error: 'End time must be after start time' });

<<<<<<< HEAD
    // Convert and validate times
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format'
      });
    }

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End time must be after start time'
      });
    }

    // Check for duplicate WAT number
    const duplicateWAT = await WAT.findOne({
      year,
      semester,
      subject,
      watNumber,
      facultyId: req.user.id
    });

    if (duplicateWAT) {
      return res.status(409).json({
        success: false,
        message: `WAT ${watNumber} already exists for this subject`
      });
    }

    // Check for time conflicts
    const timeConflict = await WAT.findOne({
      facultyId: req.user.id,
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lte: start }, endTime: { $gte: end } }
=======
    // duplicate WAT-number check
    const dup = await WAT.findOne({ subject, year, semester, watNumber });
    if (dup) return res.status(409).json({ error: 'Duplicate WAT', existingWat: dup });

    // overlapping time check (same year)
    const overlap = await WAT.findOne({
      year,
      $or: [
        { startTime: { $lte: start }, endTime: { $gte: start } },
        { startTime: { $lte: end },   endTime: { $gte: end   } },
        { startTime: { $gte: start }, endTime: { $lte: end   } }
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
      ]
    });
    if (overlap) return res.status(409).json({ error: 'Overlap', existingWat: overlap });

<<<<<<< HEAD
    if (timeConflict) {
      return res.status(409).json({
        success: false,
        message: 'Time conflict with existing WAT',
        conflictingWAT: {
          id: timeConflict._id,
          subject: timeConflict.subject,
          watNumber: timeConflict.watNumber,
          startTime: timeConflict.startTime,
          endTime: timeConflict.endTime
        }
      });
    }

    // Create new WAT
    const newWAT = await WAT.create({
      facultyId: req.user.id,
      year,
      semester,
      subject,
      watNumber,
      startTime: start,
      endTime: end,
      
    });

    res.status(201).json({
      success: true,
      message: 'WAT created successfully',
      data: {
        id: newWAT._id,
        watNumber: newWAT.watNumber,
        subject: newWAT.subject
      }
    });

  } catch (error) {
    console.error('WAT creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
router.get('/by-year/:year', async (req, res) => {
=======
    const wat = new WAT({ facultyId, year, semester, subject, watNumber, questions, startTime: start, endTime: end });
    await wat.save();
    res.status(201).json({ message: 'WAT created', wat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all WATs
router.get('/', async (req, res) => {
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
  try {
    const wats = await WAT.find({});
    res.json(wats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

<<<<<<< HEAD
=======
// get active WATs (now between start/end)
router.get('/active', async (req, res) => {
  try {
    const now = new Date();
    const wats = await WAT.find({ startTime: { $lte: now }, endTime: { $gte: now } });
    res.json(wats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

// get active by year
router.get('/active/by-year/:year', async (req, res) => {
  try {
    const now = new Date();
    const wats = await WAT.find({
      year: req.params.year,
      startTime: { $lte: now },
      endTime: { $gte: now }
    });
    res.json(wats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

<<<<<<< HEAD


// GET /api/wats/display/:id Get full WAT details including questions
router.get('/display/:id', async (req, res) => {
=======
// get WAT by id (including questions)
router.get('/:id', async (req, res) => {
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
  try {
    const wat = await WAT.findById(req.params.id);
    if (!wat) return res.status(404).json({ error: 'Not found' });
    res.json(wat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

<<<<<<< HEAD


router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { watId, studentId, answers } = req.body;
    const tabSwitches = req.body.tabSwitches || 0;
    const autoSubmitted = req.body.autoSubmitted || false;

    // Validate input
    if (!mongoose.Types.ObjectId.isValid(watId)) {
      return res.status(400).json({ error: 'Invalid WAT ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid Student ID' });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Answers must be a non-empty array' });
    }
=======
// submit answers
router.post('/submit', async (req, res) => {
  const { watId, studentId, answers } = req.body;
  if (!watId || !studentId || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid submission' });
  }
  try {
    const already = await WatSubmission.findOne({ watId, studentId });
    if (already) return res.status(400).json({ error: 'Already submitted' });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

    // Find the WAT
    const wat = await WAT.findById(watId);
    if (!wat) {
      return res.status(404).json({ error: 'WAT not found' });
    }

    // Calculate score and validate answers
    let score = 0;
<<<<<<< HEAD
    const processedAnswers = [];
    const questionMap = new Map(wat.questions.map(q => [q._id.toString(), q]));

    for (const answer of answers) {
      if (!mongoose.Types.ObjectId.isValid(answer.questionId)) {
        continue; // or return error
      }

      const question = questionMap.get(answer.questionId.toString());
      if (!question) {
        continue; // question not found in this WAT
      }

      const isCorrect = answer.selectedOption === question.correctAnswer;
      if (isCorrect) score++;

      processedAnswers.push({
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect
      });
    }

    // Create or update submission
    const submissionData = {
      watId,
      studentId,
      answers: processedAnswers,
      score,
      tabSwitches,
      autoSubmitted
    };

    const submission = await WatSubmission.findOneAndUpdate(
      { watId, studentId },
      submissionData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({
      success: true,
      score,
      totalQuestions: wat.questions.length,
      submissionId: submission._id
    });

  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all WAT submissions for a specific student
router.get('/submissions/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    // Validate studentId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Fetch submissions with WAT details
    const submissions = await WatSubmission.aggregate([
      {
        $match: { studentId: new mongoose.Types.ObjectId(studentId) }
      },
      {
        $lookup: {
          from: 'wats',
          localField: 'watId',
          foreignField: '_id',
          as: 'watDetails'
        }
      },
      {
        $unwind: '$watDetails'
      },
      {
        $project: {
          _id: 1,
          score: 1,
          totalQuestions: { $size: '$watDetails.questions' },
          submittedAt: 1,
          watDetails: {
            subject: 1,
            watNumber: 1,
            semester: 1,
            year: 1
          }
        }
      },
      {
        $sort: { submittedAt: -1 } // Newest first
      }
    ]);

    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/by-year-faculty/:year/:facultyId', async (req, res) => {
  try {
    const { year, facultyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: 'Invalid facultyId' });
    }

    const wats = await WAT.find({ year, facultyId }).sort({ startTime: 1 });

    res.status(200).json(wats);
  } catch (error) {
    console.error('Error fetching WATs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get WATs by year and subject --mcqs generation

router.get('/by-year-subject', authenticateToken, async (req, res) => {
  try {
    const { year, subject } = req.query;
    
    if (!year || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Year and subject are required'
      });
    }

    const wats = await WAT.find({ year, subject });
    
    res.status(200).json({
      success: true,
      data: wats,
      message: wats.length > 0 
        ? 'WATs retrieved successfully' 
        : 'No WATs found for the given criteria'
    });
    
  } catch (err) {
    console.error('Error fetching WATs:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
});
// Update WAT with MCQs and syllabus
router.put('/:id', authenticateToken, async (req, res) => {
        
  try {
    const { mcqs, syllabus } = req.body;
    
    // Validate input
    if (!mcqs || !Array.isArray(mcqs)) {
      return res.status(400).json({
        success: false,
        message: 'MCQs must be provided as an array'
      });
    }

    const wat = await WAT.findById(req.params.id);
    if (!wat) {
      return res.status(404).json({ 
        success: false,
        message: 'WAT not found' 
      });
    }

    // Verify ownership
    if (wat.facultyId.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to update this WAT' 
      });
    }

    // Validate each MCQ
    const validatedMCQs = mcqs.map(mcq => {
      if (!mcq.questionText || !mcq.options || !mcq.correctAnswer) {
        throw new Error('Each MCQ must have questionText, options, and correctAnswer');
      }
      return {
        questionText: mcq.questionText,
        options: mcq.options,
        correctAnswer: mcq.correctAnswer
      };
    });

    // Update WAT document
    wat.mcqs = validatedMCQs;
    wat.syllabus = syllabus || wat.syllabus;
    wat.status = 'generated';
    wat.updatedAt = Date.now();

    await wat.save();
    
    res.json({
      success: true,
      message: 'MCQs saved successfully',
      data: {
        id: wat._id,
        mcqsCount: wat.mcqs.length,
        status: wat.status
      }
    });
    
  } catch (err) {
    console.error('WAT update error:', err.message);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
=======
    answers.forEach(a => {
      const q = wat.questions.id(a.questionId);
      if (q && q.correctAnswer === a.selectedOption) score++;
    });

    const sub = new WatSubmission({ watId, studentId, answers, score, submittedAt: new Date() });
    await sub.save();
    res.json({ message: 'Submitted', score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
  }
});



module.exports = router;
