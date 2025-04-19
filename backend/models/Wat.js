// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   questionText: { 
//     type: String, 
//     required: true,
//     trim: true
//   },
//   options: {
//     type: [String],
//     required: true,
//     validate: {
//       validator: function(v) {
//         return v.length >= 2 && v.length <= 5; // At least 2 options, max 5
//       },
//       message: 'Question must have between 2 and 5 options'
//     }
//   },
//   correctAnswer: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function(v) {
//         return this.options.includes(v); // Ensure correct answer is in options
//       },
//       message: 'Correct answer must be one of the provided options'
//     }
//   },
//   marks: {  // Added marks field
//     type: Number,
//     required: true,
//     min: 1,
//     max: 10,
//     default: 1
//   }
// });

// const watSchema = new mongoose.Schema({
//   facultyId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     required: true, 
//     ref: 'Faculty' 
//   },
//   courseName: { 
//     type: String,
//     trim: true
//   },
//   year: { 
//     type: String, 
//     required: true,
//     enum: ['E1', 'E2', 'E3', 'E4'], // Standardized year codes
//     uppercase: true
//   },
//   semester: { 
//     type: String, 
//     required: true,
//     enum: ['Sem1', 'Sem2'], // Standardized semester codes
//   },
//   watNumber: { 
//     type: String, 
//     required: true,
//     match: /^WAT[1-4]$/ // Format: WAT1, WAT2, etc.
//   },
//   subject: { 
//     type: String, 
//     required: true,
//     trim: true
//   },
//   startTime: { 
//     type: Date, 
//     required: true
//   },
//   endTime: { 
//     type: Date, 
//     required: true,
//     validate: {
//       validator: function(v) {
//         return v > this.startTime; // End time must be after start time
//       },
//       message: 'End time must be after start time'
//     }
//   },
//   totalMarks: {  // Added total marks field
//     type: Number,
//     default: function() {
//       return this.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
//     }
//   },
//   questions: { 
//     type: [questionSchema], 
//     required: true,
//     validate: {
//       validator: function(v) {
//         return v.length > 0; // At least one question
//       },
//       message: 'WAT must have at least one question'
//     }
//   }
// }, { timestamps: true });

// Indexes for better query performance
// watSchema.index({ facultyId: 1 });
// watSchema.index({ subject: 1 });
// watSchema.index({ year: 1, semester: 1 });
// watSchema.index({ startTime: 1, endTime: 1 });

// const WAT = mongoose.model('WAT', watSchema);
// module.exports = WAT;


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String], // optional
  correctAnswer: String // optional
});

const watSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  courseName: { type: String },
  year: { type: String, required: true },//ex:E1,E2,E3
  semester: { type: String, required: true },
  watNumber: { type: String, required: true },
  subject: { type: String, required: true },
  startTime: { type: Date, required: true },  // ✔️ Now using Date type
  endTime: { type: Date, required: true },    // ✔️ Now using Date type
  questions: { type: [questionSchema], required: true }
});

const WAT = mongoose.model('WAT', watSchema);
module.exports = WAT;
