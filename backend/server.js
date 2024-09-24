const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

const app = express();
require('dotenv').config();

// Ensure 'uploads/' folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(helmet());  // Security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup with file limits and validation
const sanitizeFileName = (filename) => filename.replace(/[^a-zA-Z0-9.]/g, '_');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, sanitizeFileName(uniqueSuffix + '-' + file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Incorrect file type');
      error.code = 'INCORRECT_FILETYPE';
      return cb(error, false);
    }
    cb(null, true);
  }
});

// Serve static files from 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mongoose schema
const studentReportSchema = new mongoose.Schema({
  regNo: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true, minlength: 10, maxlength: 15 },
  mailConfirmationProof: String,
  internshipOfferLetterProof: String,
  letterOfIntentProof: String,
  offerLetterProof: String
});

const StudentReport = mongoose.model('StudentReport', studentReportSchema);

// POST route for file upload
app.post('/api/student-report', upload.fields([
  { name: 'mailConfirmationProof', maxCount: 1 },
  { name: 'internshipOfferLetterProof', maxCount: 1 },
  { name: 'letterOfIntentProof', maxCount: 1 },
  { name: 'offerLetterProof', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files) return res.status(400).json({ error: 'No files uploaded' });

    const reportData = {
      ...req.body,
      mailConfirmationProof: req.files?.mailConfirmationProof ? req.files.mailConfirmationProof[0].path : '',
      internshipOfferLetterProof: req.files?.internshipOfferLetterProof ? req.files.internshipOfferLetterProof[0].path : '',
      letterOfIntentProof: req.files?.letterOfIntentProof ? req.files.letterOfIntentProof[0].path : '',
      offerLetterProof: req.files?.offerLetterProof ? req.files.offerLetterProof[0].path : ''
    };

    const report = new StudentReport(reportData);
    await report.save();
    res.status(201).json({ message: 'Student report created and files uploaded successfully.' });
  } catch (error) {
    if (error.code === 'INCORRECT_FILETYPE') {
      return res.status(422).json({ error: 'Invalid file type. Only PDF, JPEG, and PNG are allowed.' });
    }
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(422).json({ error: 'File too large. Maximum file size is 5MB.' });
    }
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save student report' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => console.log('Server is running on port 5000'));
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));
