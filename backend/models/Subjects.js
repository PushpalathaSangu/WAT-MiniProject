const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4], // assuming 4 years
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2], // sem1 and sem2
  },
  subjects: [
    {
      code: { type: String, required: true },  // e.g., "CS201"
      name: { type: String, required: true }   // e.g., "Data Structures"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
