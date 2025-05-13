// models/Faculty.js
// const mongoose = require("mongoose");

<<<<<<< HEAD
// const FacultySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },

//   years: {
//     type: [String],
//     required: true,
//   },
//   subjects: {
//     type: Map,
//     of: [String], // { "E1": ["Math", "Physics"] }
//     required: true,
//   },
//   contact: {
//     type: String,
//     required: true,
//     match: [/^\d{10}$/, "Invalid contact number"],
//   },
// });

// module.exports = mongoose.model("Faculty", FacultySchema);

// models/Faculty.js
const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String, required: true },
  years: [String],
  subjects: {
    type: Map,
    of: [String] 
  }
});
=======
const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  years: {
    type: [String],  // Array of year strings like ["1", "2", "3"]
    required: true,
    validate: {
      validator: function(years) {
        return years.length > 0; // At least one year required
      },
      message: "At least one year must be assigned"
    }
  },
  subjects: {
    type: Map,       // Map structure: { "year": ["subject1", "subject2"] }
    of: [String],
    required: true
  },
  contact: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid contact number"],
  },
  role: {
    type: String,
    default: "faculty"
  }
}, { timestamps: true });

// Add indexes for better query performance
FacultySchema.index({ email: 1 });
FacultySchema.index({ years: 1 });
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

module.exports = mongoose.model('Faculty', facultySchema);
