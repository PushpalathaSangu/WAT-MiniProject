const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WAT = require('../models/Wat');
const WatSubmission = require('../models/WatSubmission');

// create a new WAT
router.post('/create', async (req, res) => {
  try {
    const { facultyId, year, semester, startTime, endTime, watNumber, questions, subject } = req.body;

    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({ error: 'Invalid facultyId' });
    }
    const start = new Date(startTime), end = new Date(endTime);
    if (start >= end) return res.status(400).json({ error: 'End time must be after start time' });

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
      ]
    });
    if (overlap) return res.status(409).json({ error: 'Overlap', existingWat: overlap });

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
  try {
    const wats = await WAT.find({});
    res.json(wats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

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

// get WAT by id (including questions)
router.get('/:id', async (req, res) => {
  try {
    const wat = await WAT.findById(req.params.id);
    if (!wat) return res.status(404).json({ error: 'Not found' });
    res.json(wat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// submit answers
router.post('/submit', async (req, res) => {
  const { watId, studentId, answers } = req.body;
  if (!watId || !studentId || !Array.isArray(answers)) {
    return res.status(400).json({ error: 'Invalid submission' });
  }
  try {
    const already = await WatSubmission.findOne({ watId, studentId });
    if (already) return res.status(400).json({ error: 'Already submitted' });

    const wat = await WAT.findById(watId);
    if (!wat) return res.status(404).json({ error: 'WAT not found' });

    let score = 0;
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
  }
});

module.exports = router;
