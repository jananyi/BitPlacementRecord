// const express = require('express');
// const router = express.Router();
// const StudentReport = require('../models/studentReport.model');

// // Route to submit student report
// router.post('/student-report', async (req, res) => {
//   try {
//     const studentReport = new StudentReport(req.body);
//     await studentReport.save();
//     res.status(201).json({ message: 'Student report saved successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to save student report' });
//   }
// });

// // Route to get the tracker data
// router.get('/track-data', async (req, res) => {
//   try {
//     const trackerData = await StudentReport.find();
//     res.status(200).json(trackerData);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch tracker data' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const StudentReport = require('../models/studentReport.model');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File validation: accept only specific file types
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|pdf/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images and PDFs are allowed'));
  }
};

// Set up Multer with storage configuration and file validation
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// POST route to handle form submission with file uploads
router.post('/student-report', upload.fields([
  { name: 'mailConfirmationProof', maxCount: 1 },
  { name: 'internshipOfferLetterProof', maxCount: 1 },
  { name: 'letterOfIntentProof', maxCount: 1 },
  { name: 'offerLetterProof', maxCount: 1 }
]), async (req, res) => {
  try {
    // Access form fields (non-file data) from req.body
    const formData = {
      regNo: req.body.regNo,
      name: req.body.name,
      gender: req.body.gender,
      dob: req.body.dob,
      degree: req.body.degree,
      batch: req.body.batch,
      yearOfPassing: req.body.yearOfPassing,
      phone: req.body.phone,
      email: req.body.email,
      companyName: req.body.companyName,
      category: req.body.category,
      organization: req.body.organization,
      address: req.body.address,
      city: req.body.city,
      contact: req.body.contact,
      websiteLink: req.body.websiteLink,
      mailConfirmation: req.body.mailConfirmation,
      internshipOfferLetter: req.body.internshipOfferLetter,
      internshipJoiningDate: req.body.internshipJoiningDate,
      stipendAmount: req.body.stipendAmount,
      letterOfIntent: req.body.letterOfIntent,
      offerLetter: req.body.offerLetter,
      currentJob: req.body.currentJob
    };

    // Access files from req.files
    const files = req.files;

    // You can now save formData and file information to your database
    // Example for saving file paths:
    formData.mailConfirmationProof = files.mailConfirmationProof ? files.mailConfirmationProof[0].path : null;
    formData.internshipOfferLetterProof = files.internshipOfferLetterProof ? files.internshipOfferLetterProof[0].path : null;
    formData.letterOfIntentProof = files.letterOfIntentProof ? files.letterOfIntentProof[0].path : null;
    formData.offerLetterProof = files.offerLetterProof ? files.offerLetterProof[0].path : null;

    // TODO: Save formData to the database (e.g., MongoDB)

    res.status(200).json({ message: 'Report submitted successfully', data: formData });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Server error while submitting the report' });
  }
});

module.exports = router;
