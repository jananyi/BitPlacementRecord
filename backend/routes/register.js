const express = require('express');
const bcrypt = require('bcrypt'); // Ensure you have bcrypt for password hashing
const User = require('../models/User'); // Adjust the path as needed
const router = express.Router();

router.use(express.json()); // Make sure to include this to parse JSON

router.post('/register', async (req, res) => {
  const { name, email, designation, password } = req.body; // Make sure to include email

  // Validate required fields
  if (!name || !email || !password || !designation) {
    return res.status(400).json({ message: 'Please provide a name, email, password, and designation' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email, // Include email in user creation
      password: hashedPassword,
      designation,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
