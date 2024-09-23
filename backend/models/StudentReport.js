const mongoose = require('mongoose');

const studentReportSchema = new mongoose.Schema({
  regNo: String,
  name: String,
  gender: String,
  dob: String,
  degree: String,
  batch: String,
  yearOfPassing: String,
  phone: String,
  email: String,
  companyName: String,
  category: String,
  organization: String,
  address: String,
  city: String,
  contact: String,
  websiteLink: String,
  mailConfirmation: String,
  internshipOfferLetter: String,
  internshipJoiningDate: String,
  stipendAmount: String,
  letterOfIntent: String,
  offerLetter: String,
  currentJob: String,
});

module.exports = mongoose.model('StudentReport', studentReportSchema);
