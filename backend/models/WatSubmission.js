const mongoose = require('mongoose');

const WatSubmissionSchema = new mongoose.Schema({
  watId: { type: mongoose.Schema.Types.ObjectId, ref: 'WAT', required: true },
  studentId: { type: String, required: true }, // or ObjectId if you have a Student model
  answers: [String],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WatSubmission', WatSubmissionSchema);
