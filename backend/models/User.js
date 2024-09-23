// models/User.js
const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    password: {
        type: String,
        required: true // Store the hashed password
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'administrator', 'student'] // Role must be one of these values
    }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
