const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Route to get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();  // Fetch all student data
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve student data' });
  }
});

// Route to filter students based on certain criteria
router.get('/students/filter', async (req, res) => {
  const { degree, yearOfPassing, city } = req.query;
  try {
    // Example filter query
    const filteredStudents = await Student.find({
      degree,
      yearOfPassing,
      city
    });
    res.json(filteredStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter student data' });
  }
});

module.exports = router;
