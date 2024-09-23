const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Ensure unique filenames
  }
});

const upload = multer({ storage: storage });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mongoose schema and model (adjust as needed for your data structure)
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
  mailConfirmationProof: String, // Will store file path
  internshipOfferLetter: String,
  internshipOfferLetterProof: String, // Will store file path
  internshipJoiningDate: String,
  stipendAmount: String,
  letterOfIntent: String,
  letterOfIntentProof: String, // Will store file path
  offerLetter: String,
  offerLetterProof: String, // Will store file path
  currentJob: String
});

const StudentReport = mongoose.model('StudentReport', studentReportSchema);

// POST route to handle form submissions and file uploads
app.post('/api/student-report', upload.fields([
  { name: 'mailConfirmationProof', maxCount: 1 },
  { name: 'internshipOfferLetterProof', maxCount: 1 },
  { name: 'letterOfIntentProof', maxCount: 1 },
  { name: 'offerLetterProof', maxCount: 1 }
]), async (req, res) => {
  try {
    // Form data from request body and uploaded file paths
    const reportData = {
      ...req.body, // Spread the body data into the report object
      mailConfirmationProof: req.files?.mailConfirmationProof ? req.files.mailConfirmationProof[0].path : '',
      internshipOfferLetterProof: req.files?.internshipOfferLetterProof ? req.files.internshipOfferLetterProof[0].path : '',
      letterOfIntentProof: req.files?.letterOfIntentProof ? req.files.letterOfIntentProof[0].path : '',
      offerLetterProof: req.files?.offerLetterProof ? req.files.offerLetterProof[0].path : ''
    };

    // Create a new StudentReport entry
    const report = new StudentReport(reportData);
    await report.save();

    // Return success message
    res.status(201).json({ message: 'Student report created and files uploaded successfully.' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save student report' });
  }
});

// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });