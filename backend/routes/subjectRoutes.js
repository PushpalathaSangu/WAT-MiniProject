const express = require('express');
const router = express.Router();
const Subject = require('../models/Subjects');

// POST: Add subjects
router.post('/add', async (req, res) => {
  try {
    const { year, semester, subjects } = req.body;
    const existing = await Subject.findOne({ year, semester });

    if (existing) {
      // Update if already exists
      existing.subjects = subjects;
      await existing.save();
      return res.status(200).json({ message: 'Subjects updated successfully' });
    }

    const newEntry = new Subject({ year, semester, subjects });
    await newEntry.save();
    res.status(201).json({ message: 'Subjects added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET: Fetch subjects by year and semester
router.get('/:year/:semester', async (req, res) => {
  try {
    const { year, semester } = req.params;
    const subjectData = await Subject.findOne({ year, semester });
    res.status(200).json(subjectData || {});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
});

module.exports = router;
