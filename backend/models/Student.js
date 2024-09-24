const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: String,
  studentName: String,
  gender: String,
  degree: String,
  batch: String,
  phoneNo: String,
  yearOfPassing: Number,
  companyName: String,
  category: String,
  organization: String,
  city: String,
  currentlyWorking: String
});

module.exports = mongoose.model('Student', studentSchema);
