import React, { useState } from 'react';
import { FaUser, FaLock, FaUserTie, FaEnvelope } from 'react-icons/fa'; // Add FaEnvelope for email icon
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');  // Add email state
  const [designation, setDesignation] = useState('student');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true
    try {
      // Make a POST request to the register endpoint
      const response = await fetch('http://localhost:5000/api/auth/register', { // Ensure correct route for register
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include the correct fields in the request body
        body: JSON.stringify({ name, email, designation, password }), // Include 'name', 'email', 'designation', and 'password'
      });
  
      const data = await response.json(); // Parse the response as JSON
      if (response.ok) {
        // If the registration was successful, clear the input fields and navigate to the login form
        setName('');
        setEmail('');
        setPassword('');
        alert(data.message);
        navigate('/LoginForm/LoginForm'); // Navigate to the login page
      } else {
        // If there was an error, alert the user
        alert('Error: ' + data.message);
      }
    } catch (error) {
      // Handle network errors
      alert('Network Error: ' + error.message);
    } finally {
      // Set loading state back to false
      setLoading(false);
    }
  };  

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>

        {/* Email Input */}
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-box">
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="administrator">Administrator</option>
          </select>
          <FaUserTie className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'SIGN UP'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
