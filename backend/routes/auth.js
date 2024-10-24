const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Administrator = require('../models/Administrator');

// Registration route
router.post('/register', async (req, res) => {
    console.log('Incoming request data:', req.body);  // Log incoming data

    const { name, email, password, designation } = req.body;

    // Basic validation
    if (!name || !email || !password || !designation) {
        return res.status(400).json({ message: 'Please provide a name, email, password, and designation' });
    }

    try {
        // Check if the user already exists in the user collection
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            designation  // Admin, Administrator, or Student
        });

        await newUser.save();  // Save the user to the 'User' collection

        // Based on the role, save the user into the respective collection
        if (designation === 'student') {
            const newStudent = new Student({
                name,
                email,
                password: hashedPassword,
            });
            await newStudent.save();
        } else if (designation === 'admin') {
            const newAdmin = new Admin({
                name,
                email,
                password: hashedPassword,
            });
            await newAdmin.save();
        } else if (designation === 'administrator') {
            const newAdministrator = new Administrator({
                name,
                email,
                password: hashedPassword,
            });
            await newAdministrator.save();
        }

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);  // Log the error
        res.status(500).json({ message: 'Server error during registration' });
    }
});

const handleSignUp = async (name, email, password, designation) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, designation }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Signup successful:', data);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
module.exports = router;
