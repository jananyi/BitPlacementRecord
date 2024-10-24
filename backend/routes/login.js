// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User'); // User model

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }

//     // Send the designation in the response
//     res.status(200).json({
//       message: 'Login successful',
//       designation: user.designation
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error during login' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // User model

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Generic message for security
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Same message for security
    }

    // Send designation in response
    res.status(200).json({
      message: 'Login successful',
      name: user.name,
      designation: user.designation,
    });
  } catch (error) {
    console.error('Error during login:', error.message || error); // Better logging
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
