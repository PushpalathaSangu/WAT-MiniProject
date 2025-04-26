// models/Faculty.js
const mongoose = require("mongoose");

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

module.exports = mongoose.model("Faculty", FacultySchema);