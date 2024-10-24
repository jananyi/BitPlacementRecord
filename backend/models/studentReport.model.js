const mongoose = require('mongoose');

const studentReportSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  degree: { type: String, required: true },
  batch: { type: String, required: true },
  yearOfPassing: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  category: { type: String, required: true },
  organization: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  websiteLink: { type: String, required: true },
  mailConfirmation: { type: String, required: true },
  mailConfirmationProof: { type: String },
  internshipOfferLetter: { type: String, required: true },
  internshipOfferLetterProof: { type: String },
  internshipJoiningDate: { type: Date, required: true },
  stipendAmount: { type: String },
  letterOfIntent: { type: String, required: true },
  letterOfIntentProof: { type: String },
  offerLetter: { type: String, required: true },
  offerLetterProof: { type: String },
  currentJob: { type: String, required: true },
  approvedRejected: { type: String, default: 'Pending' },
  remarks: { type: String, default: '' },
});

const StudentReport = mongoose.model('StudentReport', studentReportSchema);
module.exports = StudentReport;
