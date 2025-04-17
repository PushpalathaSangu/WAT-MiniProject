// const mongoose = require('mongoose');

// const questionSchema = new mongoose.Schema({
//   questionText: String,
//   options: [String],
//   correctOptionIndex: Number
// });

// const watSchema = new mongoose.Schema({
//   facultyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Faculty',
//     required: true
//   },
//   subject: {
//     type: String,
//     required: true
//   },
//   year: Number,
//   semester: Number,
//   watNumber: {
//     type: Number,
//     enum: [1, 2, 3, 4],
//     required: true
//   },
//   questions: [questionSchema],
//   startTime: Date,
//   endTime: Date
// }, { timestamps: true });

// module.exports = mongoose.model('WAT', watSchema);



// 

// const mongoose = require('mongoose');

// const watSchema = new mongoose.Schema({
//   facultyId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   courseName: { type: String},
//   year: { type: String, required: true },
//   semester: { type: String, required: true },
//   date: { type: Date },
//   question: [{
//     questionText: { type: String, required: true },
//     options:{type:[String],required:true},
//     correctOptionIndex:{type:Number,required:true}
//   }] ,
//   subject: { type: String, required: true },
//   startTime: { type: Date, required: true },
//   endTime: { type: Date, required: true },
//   watNumber: { type: String, required: true }
// });

// const WAT = mongoose.model('WAT', watSchema);

// module.exports = WAT;


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOptionIndex: { type: Number, required: true }
});

const watSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  courseName: { type: String }, // optional if not required
  year: { type: String, required: true }, // 'E3', etc.
  semester: { type: String, required: true }, // 'Sem2', etc.
  watNumber: { type: String, required: true },
  subject: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  questions: { type: [questionSchema], required: true }
});

const WAT = mongoose.model('WAT', watSchema);

module.exports = WAT;

