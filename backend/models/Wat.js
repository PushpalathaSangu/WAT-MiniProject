// models/WAT.js

const mongoose = require('mongoose');

const watSchema = new mongoose.Schema({
  facultyId: mongoose.Schema.Types.ObjectId,
  year: String,
  semester: String,
  subject: String,
  watNumber: Number,
  questions: Array, // Assuming it's an array of questions
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('WAT', watSchema);
