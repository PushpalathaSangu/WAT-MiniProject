const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/, // Indian mobile number validation
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  assignedSubjects: {
    type: Map,
    of: [String], // Array of subjects
    default: {},
  },
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('Admin', adminSchema);









// const mongoose = require('mongoose');

// const adminSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     match: /^[6-9]\d{9}$/ // Indian mobile number validation
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     match: /^\S+@\S+\.\S+$/
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Admin', adminSchema);
