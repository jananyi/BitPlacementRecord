const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registration route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    // Basic validation
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Please provide a username, password, and role' });
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);  // Generate a salt for hashing
        const hashedPassword = await bcrypt.hash(password, salt);  // Hash the password with the salt

        // Create and save the user in the database
        const newUser = new User({
            username,
            password: hashedPassword,  // Store the hashed password
            role,  // Admin, Administrator, or Student
        });

        await newUser.save();  // Save the user to MongoDB
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find the user in the database
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Send success response with user's role
    res.json({ message: 'Login successful', role: user.role });
});

module.exports = router;
