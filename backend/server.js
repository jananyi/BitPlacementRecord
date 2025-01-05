const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const authRoutes = require('./routes/auth'); // Authentication routes
const loginRoutes = require('./routes/login');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

// Ensure 'uploads/' folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet()); // Security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use authRoutes for authentication
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);

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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Incorrect file type'), false);
    }
    cb(null, true);
  }
});

// Mongoose schema for student reports
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

// Define the root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// POST route for file upload and student report creation
app.post('/api/student-report', upload.fields([
  { name: 'mailConfirmationProof', maxCount: 1 },
  { name: 'internshipOfferLetterProof', maxCount: 1 },
  { name: 'letterOfIntentProof', maxCount: 1 },
  { name: 'offerLetterProof', maxCount: 1 }
]), async (req, res) => {
  try {
    const { regNo, name, email, phone } = req.body;

    // Validate required fields
    if (!regNo || !name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required: regNo, name, email, phone.' });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

// Start the server
app.listen(5001, () => {
  console.log('Server is running on http://localhost:5000');
});


    // Create student report data
    const reportData = {
      regNo,
      name,
      email,
      phone,
      mailConfirmationProof: req.files.mailConfirmationProof ? req.files.mailConfirmationProof[0].path : '',
      internshipOfferLetterProof: req.files.internshipOfferLetterProof ? req.files.internshipOfferLetterProof[0].path : '',
      letterOfIntentProof: req.files.letterOfIntentProof ? req.files.letterOfIntentProof[0].path : '',
      offerLetterProof: req.files.offerLetterProof ? req.files.offerLetterProof[0].path : ''
    };

    // Save report to database
    const report = new StudentReport(reportData);
    await report.save();

    res.status(201).json({ message: 'Student report created and files uploaded successfully.' });
  } catch (error) {
    console.error('Error saving report:', error);
    let errorMessage = 'Failed to save student report';

    // Specific error handling based on multer error codes
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(422).json({ message: 'File too large. Maximum file size is 5MB.' });
      }
    } else if (error.message === 'Incorrect file type') {
      return res.status(422).json({ message: 'Invalid file type. Only PDF, JPEG, and PNG are allowed.' });
    }

    res.status(500).json({ message: errorMessage });
  }
});

// Connect to MongoDB and start server only after connection is successful
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process on failure
  });
